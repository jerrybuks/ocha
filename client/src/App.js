import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import Routes from './routing/Routes'
import theme from './theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
    <div>
       <Routes />
    </div>
    </ThemeProvider>
  );
}

export default App;
