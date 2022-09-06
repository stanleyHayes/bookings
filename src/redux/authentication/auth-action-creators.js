import {
    CHANGE_PASSWORD_FAILURE,
    CHANGE_PASSWORD_REQUEST,
    CHANGE_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAILURE,
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS, GET_PROFILE_FAILURE, GET_PROFILE_REQUEST, GET_PROFILE_SUCCESS,
    SIGN_IN_FAILURE,
    SIGN_IN_REQUEST,
    SIGN_IN_SUCCESS,
    SIGN_OUT_FAILURE,
    SIGN_OUT_REQUEST,
    SIGN_OUT_SUCCESS,
    SIGN_UP_FAILURE,
    SIGN_UP_REQUEST,
    SIGN_UP_SUCCESS,
    UPDATE_PROFILE_FAILURE,
    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_SUCCESS,
    VERIFY_ACCOUNT_FAILURE,
    VERIFY_ACCOUNT_REQUEST,
    VERIFY_ACCOUNT_SUCCESS
} from "./auth-action-types";
import axios from "axios";
import {
    STREAMING_RESOURCE_GH_SERVER_URL,
    STREAMING_RESOURCE_GH_TOKEN_KEY,
    STREAMING_RESOURCE_GH_USER_KEY
} from "../../constants/constants";


const getProfileRequest = () => {
    return {
        type: GET_PROFILE_REQUEST
    }
}

const getProfileSuccess = (user, token) => {
    return {
        type: GET_PROFILE_SUCCESS,
        payload: {user, token}
    }
}

const getProfileFailure = error => {
    return {
        type: GET_PROFILE_FAILURE,
        payload: error
    }
}

export const getProfile = (token) => {
    return dispatch => {
        dispatch(getProfileRequest());
        axios({
            method: 'get',
            url: `${STREAMING_RESOURCE_GH_SERVER_URL}/auth/profile`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(res => {
            const {data, token} = res.data;
            dispatch(getProfileSuccess(data, token));
            localStorage.setItem(STREAMING_RESOURCE_GH_TOKEN_KEY, JSON.stringify(token));
            localStorage.setItem(STREAMING_RESOURCE_GH_USER_KEY, JSON.stringify(data));
        }).catch(error => {
            dispatch(getProfileFailure(error.response.data.message));
        });
    }
}

const signInRequest = () => {
    return {
        type: SIGN_IN_REQUEST
    }
}

const signInSuccess = (user, token) => {
    return {
        type: SIGN_IN_SUCCESS,
        payload: {user, token}
    }
}

const signInFailure = error => {
    return {
        type: SIGN_IN_FAILURE,
        payload: error
    }
}

export const signIn = (user, history, showNotification) => {
    return dispatch => {
        dispatch(signInRequest());
        axios({
            method: 'post',
            url: `${STREAMING_RESOURCE_GH_SERVER_URL}/auth/login`,
            data: user
        }).then(res => {
            const {data, token, message} = res.data;
            dispatch(signInSuccess(data, token));
            localStorage.setItem(STREAMING_RESOURCE_GH_TOKEN_KEY, JSON.stringify(token));
            localStorage.setItem(STREAMING_RESOURCE_GH_USER_KEY, JSON.stringify(data));
            history.push('/');
            showNotification(message, {variant: 'success'});
        }).catch(error => {
            showNotification(error.response.data.message, {variant: 'error'});
            dispatch(signInFailure(error.response.data.message));
        });
    }
}

const signUpRequest = () => {
    return {
        type: SIGN_UP_REQUEST
    }
}

const signUpSuccess = (user, token) => {
    return {
        type: SIGN_UP_SUCCESS,
        payload: {user, token}
    }
}

const signUpFailure = error => {
    return {
        type: SIGN_UP_FAILURE,
        payload: error
    }
}

export const signUp = (user, history,  resetForm, setSubmitting, showMessage) => {
    return dispatch => {
        dispatch(signUpRequest());
        axios({
            method: 'post',
            url: `${STREAMING_RESOURCE_GH_SERVER_URL}/auth/register`,
            data: user
        }).then(res => {
            const {data, token, message} = res.data;
            setSubmitting(false);
            resetForm();
            dispatch(signUpSuccess(data, token));
            localStorage.setItem(STREAMING_RESOURCE_GH_TOKEN_KEY, JSON.stringify(token));
            localStorage.setItem(STREAMING_RESOURCE_GH_USER_KEY, JSON.stringify(data));
            showMessage(message, {variant: 'success'});
            history.push('/auth/login');
        }).catch(error => {
            showMessage(error.response.data.message, {variant: 'error'});
            dispatch(signUpFailure(error.response.data.message));
        });
    }
}

const verifyAccountRequest = () => {
    return {
        type: VERIFY_ACCOUNT_REQUEST
    }
}

const verifyAccountSuccess = user => {
    return {
        type: VERIFY_ACCOUNT_SUCCESS,
        payload: user
    }
}

const verifyAccountFailure = error => {
    return {
        type: VERIFY_ACCOUNT_FAILURE,
        payload: error
    }
}

export const verifyAccount = (otp, token, history) => {
    return dispatch => {
        dispatch(verifyAccountRequest());
        axios({
            method: 'put',
            url: `${STREAMING_RESOURCE_GH_SERVER_URL}/auth/verify-otp`,
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            data: {otp}
        }).then(res => {
            const {data} = res.data;
            dispatch(verifyAccountSuccess(data));
            history.push('/auth/login');
        }).catch(error => {
            dispatch(verifyAccountFailure(error.response.data.message));
        });
    }
}


const updateProfileRequest = () => {
    return {
        type: UPDATE_PROFILE_REQUEST
    }
}

const updateProfileSuccess = user => {
    return {
        type: UPDATE_PROFILE_SUCCESS,
        payload: user
    }
}

const updateProfileFailure = error => {
    return {
        type: UPDATE_PROFILE_FAILURE,
        payload: error
    }
}

export const updateProfile = (user, token, history, handleShowNotification) => {
    return dispatch => {
        dispatch(updateProfileRequest());
        axios({
            method: 'put',
            url: `${STREAMING_RESOURCE_GH_SERVER_URL}/auth/profile`,
            headers: {
                Authorization: `Bearer ${token}`
            },
            data: user
        }).then(res => {
            const {data, message} = res.data;
            handleShowNotification(message, {variant: 'success'});
            dispatch(updateProfileSuccess(data));
            localStorage.setItem(STREAMING_RESOURCE_GH_USER_KEY, JSON.stringify(data));
            history.push('/account');
        }).catch(error => {
            handleShowNotification(error.response.data.message, {variant: 'error'});
            dispatch(updateProfileFailure(error.response.data.message));
        });
    }
}


const changePasswordRequest = () => {
    return {
        type: CHANGE_PASSWORD_REQUEST
    }
}

const changePasswordSuccess = user => {
    return {
        type: CHANGE_PASSWORD_SUCCESS,
        payload: user
    }
}

const changePasswordFailure = error => {
    return {
        type: CHANGE_PASSWORD_FAILURE,
        payload: error
    }
}

export const changePassword = (passwords, token, history) => {
    return dispatch => {
        dispatch(changePasswordRequest());
        axios({
            method: 'put',
            url: `${STREAMING_RESOURCE_GH_SERVER_URL}/auth/update-password`,
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            data: passwords
        }).then(res => {
            const {data} = res.data;
            dispatch(changePasswordSuccess(data));
            history.push('/profile');
        }).catch(error => {
            dispatch(changePasswordFailure(error.response.data.message));
        });
    }
}


const forgotPasswordRequest = () => {
    return {
        type: FORGOT_PASSWORD_REQUEST
    }
}

const forgotPasswordSuccess = user => {
    return {
        type: FORGOT_PASSWORD_SUCCESS,
        payload: user
    }
}

const forgotPasswordFailure = error => {
    return {
        type: FORGOT_PASSWORD_FAILURE,
        payload: error
    }
}

export const forgotPassword = (email, history, showNotification) => {
    return dispatch => {
        dispatch(forgotPasswordRequest());
        axios({
            method: 'put',
            url: `${STREAMING_RESOURCE_GH_SERVER_URL}/auth/forgot-password`,
            headers: {
                'Content-Type': 'application/json'
            },
            data: email
        }).then(res => {
            const {data, message} = res.data;
            dispatch(forgotPasswordSuccess(data));
            showNotification(message, {variant: 'success'});
            history.push('/auth/reset-password');
        }).catch(error => {
            showNotification(error.response.data.message, {variant: 'error'});
            dispatch(forgotPasswordFailure(error.response.data.message));
        });
    }
}


const signOutRequest = () => {
    return {
        type: SIGN_OUT_REQUEST
    }
}

const signOutSuccess = () => {
    return {
        type: SIGN_OUT_SUCCESS
    }
}

const signOutFailure = error => {
    return {
        type: SIGN_OUT_FAILURE,
        payload: error
    }
}

export const signOut = (token, history) => {
    return dispatch => {
        dispatch(signOutRequest());
        axios({
            method: 'POST',
            url: `${STREAMING_RESOURCE_GH_SERVER_URL}/auth/logout`,
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
        }).then(res => {
            history.push('/auth/login');
            localStorage.removeItem(STREAMING_RESOURCE_GH_USER_KEY);
            localStorage.removeItem(STREAMING_RESOURCE_GH_TOKEN_KEY);
            const {data} = res.data;
            dispatch(signOutSuccess(data));
        }).catch(error => {
            history.push('/auth/login');
            dispatch(signOutFailure(error.response.data.message));
        });
    }
}
