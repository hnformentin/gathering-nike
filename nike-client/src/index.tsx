import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { acquireToken, AuthProvider } from "./Components/Auth";
import theme from "./Config/theme";
import { CssBaseline, ThemeProvider } from "@material-ui/core";
import moment from "moment";
import "moment/locale/en-gb";
import { Provider as FetchProvider } from "use-http";
import { GRAPH_REQUESTS } from "./Components/Auth/auth-utils";
import "./Config/eds-icons";
import { getJsvAdminApiUrl } from "./Environment/config";

moment.locale("en-GB");

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <AuthProvider>
      <FetchProvider
        url={getJsvAdminApiUrl()}
        options={{
          interceptors: {
            request: async ({ options }) => {
              options.headers = {
                Authorization: `Bearer ${
                  (await acquireToken(GRAPH_REQUESTS.BACKEND)).accessToken
                }`,
              };
              return options;
            },
          },
        }}
      >
        <App />
      </FetchProvider>
    </AuthProvider>
  </ThemeProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
