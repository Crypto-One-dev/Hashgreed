import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import { Provider as ReduxProvider } from "react-redux"
import {
  ChakraProvider,
  Box,
  Grid,
} from '@chakra-ui/react';
import Layout from 'pages/Layout';
import reportWebVitals from './reportWebVitals';
import configureStore from "redux/store"

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const reduxStore = configureStore(window.REDUX_INITIAL_DATA)

const App = () => {
  return (
      <ChakraProvider>
        <ReduxProvider store={reduxStore}>
          <Box textAlign="center" fontSize="xl">
            <Grid minH="100vh">
              <Layout />
            </Grid>
          </Box>
        </ReduxProvider>
      </ChakraProvider>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
