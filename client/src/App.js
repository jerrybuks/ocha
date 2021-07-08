import React, { useEffect } from "react";
import { connect } from "react-redux";

import { ThemeProvider } from "@material-ui/core/styles";
import { CssBaseline } from "@material-ui/core";
import theme from "./theme";

import { checkUserSession } from "./redux/user/user.actions";
import MountedAppConatianer from "./MountedApp";
import Notification from "./components/notification";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

function App({ checkUserSession }) {
  useEffect(() => {
    checkUserSession();
  }, [checkUserSession]);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Notification />
        <MountedAppConatianer />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

const mapDispatchToProps = (dispatch) => ({
  checkUserSession: () => dispatch(checkUserSession()),
});

export default connect(null, mapDispatchToProps)(App);
