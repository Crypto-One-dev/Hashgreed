import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import {
  ChakraProvider,
  Box,
  Grid,
} from '@chakra-ui/react';
import Routes from './routes';
import reportWebVitals from './reportWebVitals';
import ThemeContext from 'context/UserContext';
import themes from 'theme';

const App = () => {
  const [theme, setTheme] = useState(themes.light)
  return (
    <ThemeContext.Provider value={{theme, setTheme}}>
      <ChakraProvider>
        <Box textAlign="center" fontSize="xl">
          <Grid minH="100vh">
            <Routes />
          </Grid>
        </Box>
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
