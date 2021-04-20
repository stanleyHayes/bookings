import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from "react-router-dom";
import { createMuiTheme, ThemeProvider} from "@material-ui/core";
import {Provider} from "react-redux";
import store from "./app/store";
import {MuiPickersUtilsProvider} from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import 'react-multi-carousel/lib/styles.css';

const theme = createMuiTheme({
    typography: {
        fontFamily: 'Quicksand, sans-serif'
    },
    palette: {
        background: {
            paper: "#1f2833"
        },
        text: {
            primary: "#66fcf1",
            secondary: "#45a298",
            hint: "#c5c6c7",
            disabled: "#c5c6c7"
        },
        primary: {
            main: "#1f2833"
        },
        action: {
            hover: "#45a298",
            active: "#45a298"
        },
        divider: "#45a298",
        type: "dark"
    },
    shape: {
        borderRadius: 32
    }
});


ReactDOM.render(
  <React.StrictMode>
      <BrowserRouter>
          <ThemeProvider theme={theme}>
              <Provider store={store}>
                  <MuiPickersUtilsProvider utils={MomentUtils}>
                      <App />
                  </MuiPickersUtilsProvider>
              </Provider>
          </ThemeProvider>
      </BrowserRouter>

  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
