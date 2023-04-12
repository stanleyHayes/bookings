import React from 'react';
import './index.css';
import App from './App';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import 'react-multi-carousel/lib/styles.css';
import store from "./redux/store";
import {SnackbarProvider} from "notistack"
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import {createTheme, CssBaseline, ThemeProvider} from "@mui/material";
import {LocalizationProvider} from "@mui/x-date-pickers";

const theme = createTheme({
    typography: {
        fontFamily: 'Outfit, Manrope, Urbanist'
    },
    palette: {
        primary: {main: "#010101"},
        secondary: {main: "#cb324b"},
        mode: 'dark',
        text: {
            primary: "#fefefe",
            secondary: "#818181",
            paper: "#818181",
            default: "#797979"
        },
        background: {
            paper: "#222222",
            default: "#010101",
            dark: "#0f0f0f"
        },
        light: {
            secondary: 'rgba(203,50,75,0.3)',
            primary: 'rgba(52,168,83,0.3)',
            red: 'rgba(217,48,37,0.3)',
            yellow: 'rgba(249,171,0,0.3)',
            green: 'rgba(52,168,83,0.3)',
            blue: 'rgba(81,155,255,0.3)',
            white: 'rgba(255, 255, 255, 0.3)',
            active: 'rgba(255, 255, 255, 0.3)'
        },
        colors: {
            yellow: '#f9ab00',
            red: '#d93025',
            blue: '#519bff',
            green: '#34a853',
            white: '#ffffff'
        }
    },
    shape: {
        borderRadius: 0
    }
});

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <ThemeProvider theme={theme}>
                    <CssBaseline enableColorScheme={true}/>
                    <SnackbarProvider
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right'
                        }}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <App/>
                        </LocalizationProvider>
                    </SnackbarProvider>
                </ThemeProvider>
            </BrowserRouter>
        </Provider>
    </React.StrictMode>
);

reportWebVitals();
