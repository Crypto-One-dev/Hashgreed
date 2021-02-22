import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import { Provider as ReduxProvider } from "react-redux"
import {
  ChakraProvider,
  Box,
  Grid,
} from '@chakra-ui/react';
import Routes from './routes';
import reportWebVitals from './reportWebVitals';
import ThemeContext from 'context/UserContext';
import configureStore from "redux/store"
import themes from 'theme';

const reduxStore = configureStore(window.REDUX_INITIAL_DATA)

const App = () => {
  const [theme, setTheme] = useState(themes.regular)
  const [activeMenu, setActiveMenu] = useState(0)
  return (
    <ThemeContext.Provider value={{theme, setTheme, activeMenu, setActiveMenu}}>
      <ChakraProvider>
        <ReduxProvider store={reduxStore}>
          <Box textAlign="center" fontSize="xl">
            <Grid minH="100vh">
              <Routes />
            </Grid>
          </Box>
        </ReduxProvider>
      </ChakraProvider>
    </ThemeContext.Provider>
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
