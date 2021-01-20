import React from 'react';
import {createMuiTheme, ThemeProvider} from '@material-ui/core';
import {AuthProvider} from './context/AuthContext';
import {UtilsProvider} from "./context/UtilsContext";
import Colors from './Colors';
import Routers from "./Routers";


const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: Colors.primaryColor,
    },
  }
})

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <UtilsProvider>
        <AuthProvider>
          <Routers/>
        </AuthProvider>
      </UtilsProvider>
    </ThemeProvider>
  )
}

export default App;
