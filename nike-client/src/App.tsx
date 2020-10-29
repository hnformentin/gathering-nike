import React from "react";
import { AppBar } from "Components/AppBar";
import { Container, Theme, Toolbar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Unauthorized from "Components/Unauthorized";
import { useAuth } from "Components/Auth";
import { Main } from "Components/Main";

const useStyles = makeStyles(({ spacing }: Theme) => ({
  content: {
    marginTop: spacing(2),
    marginLeft: spacing(10),
  },
  alert: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

const App = () => {
  const classes = useStyles();
  const { authState } = useAuth();

  return (
    <>
      <AppBar />
      <Toolbar />
      <Container maxWidth="md" className={classes.content}>
        {authState === "authorized" ? <Main /> : <Unauthorized />}
      </Container>
    </>
  );
};

export default App;
