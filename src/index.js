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
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import {createTheme, CssBaseline, ThemeProvider} from "@mui/material";
import {LocalizationProvider} from "@mui/x-date-pickers";

const theme = createTheme({
    typography: {
        fontFamily: 'EuclidCircularB, SofiaPro, Sora, TTSquares, GoogleSans'
    },
    palette: {
        primary: {
            main: '#34a853'
        },
        secondary: {
            main: '#519bff'
        },
        text: {
            primary: '#f8f9fa',
            secondary: '#a4a4a4',
            active: '#f8f9fa',
            inactive: '#d2d3d7'
        },
        mode: 'dark',
        background: {
            paper: '#303136',
            default: '#202124',
            light: 'rgba(32,33,36,0.3)',
            appBar: 'rgba(32,33,36,0.85)'
        },
        light: {
            secondary: 'rgba(81,155,255,0.3)',
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
        borderRadius: 8
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
                        <LocalizationProvider dateAdapter={AdapterMoment}>
                            <App/>
                        </LocalizationProvider>
                    </SnackbarProvider>
                </ThemeProvider>
            </BrowserRouter>
        </Provider>
    </React.StrictMode>
);

reportWebVitals();
