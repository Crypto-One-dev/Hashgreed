import React from 'react';
import ReactDOM from 'react-dom';
import {
  ChakraProvider,
  Box,
  Grid,
  extendTheme,
} from '@chakra-ui/react';
import Routes from './routes';
import reportWebVitals from './reportWebVitals';

const theme = extendTheme({
  colors: {
    bgFirst: {
      100: "ffffff",
      900: "35364e",
    },
    bgSecond: {
      100: "f7f7f7",
      900: "554f6d"
    },
    primary: {
      900: "#d359a6",
      100: "#e29dc7"
    },
    pink: {
      900: "#d359a6",
      100: "#e29dc7"
    }
  }
})

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        <Grid minH="100vh">
          <Routes />
        </Grid>
      </Box>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
