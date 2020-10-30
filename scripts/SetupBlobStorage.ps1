# script for setup nike

Param(
    [string] $Subscription = '1d1ba129-149e-4533-a8e2-266d7a4a92ac',
    [string] $ResourceGroupName = 'ForumRGDev',
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
# SIG # Begin signature block
# MIIFdgYJKoZIhvcNAQcCoIIFZzCCBWMCAQExCzAJBgUrDgMCGgUAMGkGCisGAQQB
# gjcCAQSgWzBZMDQGCisGAQQBgjcCAR4wJgIDAQAABBAfzDtgWUsITrck0sYpfvNR
# AgEAAgEAAgEAAgEAAgEAMCEwCQYFKw4DAhoFAAQURMRakNQvtsYrOywOsH3T3sBy
# MvqgggMOMIIDCjCCAfKgAwIBAgIQYAwPwJFgbYJFh4ZdFfzDPTANBgkqhkiG9w0B
# AQUFADAdMRswGQYDVQQDDBJMb2NhbCBDb2RlIFNpZ25pbmcwHhcNMjAwNDAxMTgz
# MjEzWhcNMjEwNDAxMTg1MjEzWjAdMRswGQYDVQQDDBJMb2NhbCBDb2RlIFNpZ25p
# bmcwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDeyQp9/9v1NbE3l7Z+
# TXG5RZaK+pX40GAxlU5e75wfOWmcExRI9eZGtpk5BWkw8Z/cibxHMaTa5UCGqrF+
# RTSfy6ezzCpgU4N1S/Fpy950rXEuB3/cZN9bjcRttL74uaqAF0nmk61N4ItCzxJa
# L5ZbLRoh9GkCYxPvauVTYu3VknqtiHrVE4nlPDpH+OdzDE/2LCGjyWSL4mcLb3FZ
# PMJQ58+Rq4EUwIDxizGKs8ANEcJkxFKPClXNM2aw1FxHGM6FH7drjp+BOkqxLLlY
# Oj4zDdQfl6oENq/VHdCn8AMKHvyLRixXJGNUVHJz+gqamswg/rxzG9KQg9SQQI1O
# z+JxAgMBAAGjRjBEMA4GA1UdDwEB/wQEAwIHgDATBgNVHSUEDDAKBggrBgEFBQcD
# AzAdBgNVHQ4EFgQUNxl7PMyD6tDedO4TNeaBdu3DFhwwDQYJKoZIhvcNAQEFBQAD
# ggEBAEetUc2Yna/op05PJV+YsjLk+S+3H7p6c3XAIJJeMmlH9qbmKeeCMz+0QyIZ
# BOoCbono8buWJSuYpylAYB3Zqx83IrK/ylObJEGgL0aWSQnxCrBXYkmxiau5iNOS
# OynL1oPlD44oUj1KltKpPHv6FA4A756XeYdZN+FHWX8JhtKKIYALWswG2qIkAuBN
# FrDTaERJd1cXwC6UGT+ZhsrvT1WZ2opoQimUVkogAUkAvjSzCzm552BOxWk9FBr8
# U8e8WvrFUh1kSL7Y61DydyLoDRRk1fij4umzyz7FyLJCw55lKUp+lV6TCg9OvuLm
# 3zhRKB1z726S5/RwEU07dxnHYZYxggHSMIIBzgIBATAxMB0xGzAZBgNVBAMMEkxv
# Y2FsIENvZGUgU2lnbmluZwIQYAwPwJFgbYJFh4ZdFfzDPTAJBgUrDgMCGgUAoHgw
# GAYKKwYBBAGCNwIBDDEKMAigAoAAoQKAADAZBgkqhkiG9w0BCQMxDAYKKwYBBAGC
# NwIBBDAcBgorBgEEAYI3AgELMQ4wDAYKKwYBBAGCNwIBFTAjBgkqhkiG9w0BCQQx
# FgQUJ4cgV3vFgDVuTNQRQ8OSF+ytDmowDQYJKoZIhvcNAQEBBQAEggEAmEMmd2mE
# 5DldA6uwkHqhwXiJIO9eBMqk+L5oF5/4SKsvCnOxpfONO1/RHL68BcuKWeh5FsIv
# xTeq7+AvmdTevhIyf2fmJvXDnwzKAoYsEQ3V94TCCBfNKLcZ2Hdg7AyVEOVAM4wI
# kaPuJuQV58X0Radd8k7vQ5niTuwP/TYexe8zDVG9BUXg33xIvjOJ0j0oJNr9cVHa
# XQvKnmmkWXp5/gXiIJ91eKf09epYpkjMgdM8ED60OQ8GFm5FN8IUdFPuYTer6+lk
# fGJLDUCFSRNdEJMjrmwK0T0ZA6OLngBq4m7loNj04y+fjz/xN61EKS4UKYOMevX6
# DhA77dYiCLlRBg==
# SIG # End signature block
