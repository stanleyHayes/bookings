import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {
    DEVELOPMENT_SERVER_URL,
    STREAMING_RESOURCE_GH_DATA_KEY,
    STREAMING_RESOURCE_GH_TOKEN_KEY
} from "../../../constants/constants";

export const login = createAsyncThunk('auth/login',
    async ({email, password, history}, {rejectWithValue}) => {
        try {
            const {data} = await axios({
                method: 'post',
                url: `${DEVELOPMENT_SERVER_URL}/auth/login`,
                data: {email, password}
            });
            await localStorage.setItem(STREAMING_RESOURCE_GH_TOKEN_KEY, data.token);
            await localStorage.setItem(STREAMING_RESOURCE_GH_DATA_KEY, JSON.stringify(data.data));
            history.push('/');
            return {data}
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    });

export const logout = createAsyncThunk('auth/logout',
    async ({token}, {rejectWithValue}) => {
        try {
            const {data} = await axios({
                method: 'get',
                url: `${DEVELOPMENT_SERVER_URL}/auth/logout`,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return {data}
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    });

export const getProfile = createAsyncThunk('auth/getProfile',
    async ({token}, {rejectWithValue}) => {
        try {
            const {data} = await axios({
                method: 'get',
                url: `${DEVELOPMENT_SERVER_URL}/auth/profile`,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return {data}
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

export const deleteProfile = createAsyncThunk('auth/deleteProfile',
    async ({token}, {rejectWithValue}) => {
        try {
            const {data} = await axios({
                method: 'delete',
                url: `${DEVELOPMENT_SERVER_URL}/auth/profile`,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            await localStorage.removeItem(STREAMING_RESOURCE_GH_DATA_KEY);
            await localStorage.removeItem(STREAMING_RESOURCE_GH_TOKEN_KEY);
            return {data}
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

export const updateProfile = createAsyncThunk('auth/updateProfile',
    async ({token, ...user}, {rejectWithValue}) => {
        try {
            const {data} = await axios({
                method: 'put',
                url: `${DEVELOPMENT_SERVER_URL}/auth/profile`,
                headers: {
                    Authorization: `Bearer ${token}`
                },
                data: {...user}
            });
            await localStorage.removeItem(STREAMING_RESOURCE_GH_DATA_KEY);
            await localStorage.setItem(STREAMING_RESOURCE_GH_DATA_KEY, JSON.stringify(data.data));
            return {data}
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);


export const changePassword = createAsyncThunk('auth/changePassword',
    async ({token, ...passwords}, {rejectWithValue}) => {
        try {
            const {data} = await axios({
                method: 'put',
                url: `${DEVELOPMENT_SERVER_URL}/auth/profile`,
                headers: {
                    Authorization: `Bearer ${token}`
                },
                data: {...passwords}
            });
            return {data}
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        token: null,
        loading: false,
        user: {},
        error: '',
        message: '',
        isSignedIn: false
    },
    reducers: {
        restoreUser: (state, action) => {
            state.user = action.payload;
            state.isSignedIn = true;
        },
        restoreToken: (state, action) => {
            state.token = action.payload;
            state.isSignedIn = true;
        }
    },
    extraReducers: {
        [login.pending]: (state) => {
            state.loading = true;
            state.error = '';
            state.message = '';
            state.isSignedIn = false;
        },
        [login.fulfilled]: (state, action) => {
            state.token = action.payload.token;
            state.user = action.payload.data;
            state.message = action.payload.message;
            state.error = ''
            state.loading = false;
            state.isSignedIn = true;
        },
        [login.rejected]: (state, action) => {
            state.token = null;
            state.user = null;
            state.loading = false;
            state.message = action.error.message;
            state.error = action.error.message
            state.isSignedIn = false;
        },
        [logout.pending]: (state) => {
            state.loading = true;
            state.error = '';
            state.message = '';
            state.isSignedIn = true;
        },
        [logout.fulfilled]: (state, action) => {
            state.token = null;
            state.user = null;
            state.message = action.payload.message;
            state.error = ''
            state.loading = false;
            state.isSignedIn = true;
        },
        [logout.rejected]: (state, action) => {
            state.loading = false;
            state.message = action.error.message;
            state.error = action.error.message
            state.isSignedIn = true;
        },
        [getProfile.pending]: (state, action) => {
            state.loading = true;
            state.error = '';
            state.message = '';
        },
        [getProfile.fulfilled]: (state, action) => {
            state.user = action.payload.data;
            state.message = action.payload.message;
            state.error = '';
            state.loading = false;
        },
        [getProfile.rejected]: (state, action) => {
            state.loading = false;
            state.message = action.error.message;
            state.error = action.error.message
        },
        [deleteProfile.pending]: (state, action) => {
            state.loading = true;
            state.error = '';
            state.message = '';
            state.isSignedIn = false;
        },
        [deleteProfile.fulfilled]: (state, action) => {
            state.token = action.payload.token;
            state.user = action.payload.data;
            state.message = action.payload.message;
            state.error = ''
            state.loading = false;
            state.isSignedIn = false;
        },
        [deleteProfile.rejected]: (state, action) => {
            state.token = null;
            state.user = null;
            state.loading = false;
            state.message = action.error.message;
            state.error = action.error.message
            state.isSignedIn = true;
        },
        [updateProfile.pending]: (state, action) => {
            state.loading = true;
            state.error = '';
            state.message = '';
        },
        [updateProfile.fulfilled]: (state, action) => {
            state.user = action.payload.data.data;
            state.message = action.payload.message;
            state.error = ''
            state.loading = false;
        },
        [updateProfile.rejected]: (state, action) => {
            state.loading = false;
            state.message = action.error.message;
            state.error = action.error.message
        },
        [changePassword.pending]: (state) => {
            state.loading = true;
            state.error = '';
            state.message = '';
        },
        [changePassword.fulfilled]: (state, action) => {
            state.user = action.payload.data.data;
            state.message = action.payload.message;
            state.error = ''
            state.loading = false;
        },
        [changePassword.rejected]: (state, action) => {
            state.loading = false;
            state.message = action.error.message;
            state.error = action.error.message
        },

    }
});


const selectProfile = state => state.auth.user;
const selectToken = state => state.auth.token;
const selectError = state => state.auth.error;
const selectLoading = state => state.auth.loading;
const selectIsSignedIn = state => state.auth.isSignedIn;

export {selectProfile, selectLoading, selectToken, selectError, selectIsSignedIn};
export const {restoreToken, restoreUser} = authSlice.actions;

export default authSlice.reducer;