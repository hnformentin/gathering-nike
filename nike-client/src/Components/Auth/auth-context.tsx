import React, { useContext, useEffect, useState } from 'react';
import { fetchMsGraph, GRAPH_ENDPOINTS, GRAPH_REQUESTS, msalApp } from './auth-utils';
import { Account, AuthenticationParameters, InteractionRequiredAuthError } from 'msal';
import { FullPageSpinner } from '../../FullPageSpinner';


export type AuthState = 'loading' | 'authorized' | 'unauthorized';

interface ContextValue {
  account: Account;
  photo: string;
  authState: AuthState;
  login: () => void;
  logout: () => void;
}

export const acquireToken = async (request: AuthenticationParameters = GRAPH_REQUESTS.LOGIN) => {
  return await msalApp
    .acquireTokenSilent({ ...request, redirectUri: `${window.location.origin}/auth.html` })
    .catch((error) => {
      if (InteractionRequiredAuthError.isInteractionRequiredError(error.errorCode)) {
        msalApp.acquireTokenRedirect(request);
        throw new Error('Redirecting');
      } else {
        throw new Error(`Non-interactive error: ${error.errorCode}`);
      }
    })
    .then((token) => {
      if (!token?.accessToken) {
        console.error('Token was null!');
        msalApp.acquireTokenRedirect(request);
        throw new Error('Redirecting');
      }
      return token;
    });
};

const AuthContext = React.createContext<Partial<ContextValue>>({});

const AuthProvider: React.FC = (props) => {
  const [account, setAccount] = useState<Account | undefined | null>(undefined);
  const [photo, setPhoto] = useState<string | undefined>();
  const [authState, setAuthState] = useState<AuthState>('loading');

  useEffect(() => {
    msalApp.handleRedirectCallback((error) => {
      if (error && InteractionRequiredAuthError.isInteractionRequiredError(error.errorCode)) {
        setAuthState('unauthorized');
      } else if (error) {
        console.error(error.errorMessage, error);
      }
    });

    const account = msalApp.getAccount();
    setAccount(account);

    if (account) {
      acquireToken(GRAPH_REQUESTS.PHOTO).then(async (tokenResponse) => {
        if (tokenResponse) {
          const graphPhoto = await fetchMsGraph(GRAPH_ENDPOINTS.PHOTO, tokenResponse.accessToken)
            .then((response) => response.blob())
            .catch((error) => console.error('Failed to fetch profile photo', error));

          if (graphPhoto) {
            const url = window.URL || window.webkitURL;
            const blobUrl = url.createObjectURL(graphPhoto);
            setPhoto(blobUrl);
          }
        }
      });

      setAuthState('authorized');
    }
  }, [setAccount]);

  useEffect(() => {
    if (account === null && authState === 'loading') {
      msalApp.loginRedirect(GRAPH_REQUESTS.LOGIN);
    }
  }, [account, authState]);

  if (authState === 'loading') {
    return <FullPageSpinner />;
  } else {
    return (
      <AuthContext.Provider
        value={{ account: account ?? undefined, photo, authState, login, logout: () => msalApp.logout() }}
        {...props}
      />
    );
  }
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

const login = () => {
  msalApp.loginRedirect(GRAPH_REQUESTS.LOGIN);
};

export { AuthProvider, useAuth };
