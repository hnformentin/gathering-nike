import React, { useEffect } from 'react';
import { useAuth } from 'Components/Auth';
import { Button } from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';

const Unauthorized: React.FC = () => {
  const { login } = useAuth();
  const instructions = `You appear not to have access to the data sharing solution. If this this is the first time you try to access
the application, please try to login. If not, please request access in `;

  const accessIT = 'http://accessit.equinor.com/';

  useEffect(() => {
    localStorage.clear();
  }, []);

  return (
    <Alert
      severity="warning"
      action={
        <Button size="small" onClick={login}>
          Retry login
        </Button>
      }
    >
      <AlertTitle>Access denied</AlertTitle>
      <p>
        {instructions}
        <a href={`${accessIT}`}>AccessIT</a>
      </p>
      <br />
    </Alert>
  );
};

export default Unauthorized;
