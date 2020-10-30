# script for setup nike

Param(
    [string] $Subscription = '9469cefb-83a9-4454-9610-eec23469c1fa',
    [string] $ResourceGroupName = 'olgj-gradering',
    [string] $StorageAccountName = 'nikeblsdev',
    [string] $KeyVaultName = 'nikekvdev',
    [string] $Location = 'northeurope',
    [string] $Container='text' 
)

Set-StrictMode -Version 3.0

Function Confirm-Success {
    [CmdletBinding()]
    param (
        [Parameter(ValueFromPipeline)]
        [PSCustomObject]$Output
    )
    Begin {
        $OutputTotal = ""
    }
    Process {
        $OutputTotal += "$Output`n"
    }
    End {
        $ExitCodeToCheck = $LASTEXITCODE
        if ($ExitCodeToCheck -ne 0) {
            Write-Error $OutputTotal
            throw "Error $ExitCodeToCheck"
        }
        return "$OutputTotal"
    }
}

Function Confirm-LoggedIn {
    $loggedAccounts = az account list | Confirm-Success | ConvertFrom-Json
    foreach ($account in $loggedAccounts) {
        if ($account.id -eq $Subscription) {
            return $true
        }
    }
    return $false
}

if (! (Confirm-LoggedIn) ) {
    az login | Confirm-Success
    if (! (Confirm-LoggedIn) ) {
        throw "You do not have access to subscription $Subscription"
    }
}
az account set --subscription $Subscription
az configure --defaults location=$Location group=$ResourceGroupName --scope local | Confirm-Success | Out-Null

Write-Host "Creating storage account $StorageAccountName..."
az storage account create -n $StorageAccountName --sku Standard_LRS | Confirm-Success | Out-Null
# Get connection string
$connectionStrings = az storage account show-connection-string -n $StorageAccountName | Confirm-Success | ConvertFrom-Json
$storageAccountConnectionString = $connectionStrings.connectionString

az storage container create --name $Container --connection-string $storageAccountConnectionString
​
Write-Host "Creating key vault $KeyVaultName..."
az keyvault create --name $KeyVaultName --enable-soft-delete false | Confirm-Success | Out-Null
​
az keyvault secret set `
    --name "StorageConnection" `
    --vault-name $KeyVaultName `
    --description "TODO description" `
    --encoding "utf-8" `
    --value "$storageAccountConnectionString" | Confirm-Success | ConvertFrom-Json
