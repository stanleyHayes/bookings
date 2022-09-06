import React, {useEffect} from "react";
import {Navigate, useLocation, useNavigate} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {selectAuth} from "../../redux/authentication/auth-reducer";
import * as AUTH_ACTION_CREATORS from "../../redux/authentication/auth-action-creators";
import Splash from "./splash";

const RequireAuth = ({children}) => {

    const {token, loading} = useSelector(selectAuth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {pathname} = useLocation();

    useEffect(() => {
        dispatch(AUTH_ACTION_CREATORS.getProfile(token, navigate));
    }, [token]);

    if (!token) {
        return <Navigate to="/auth/login" state={{pathname}}/>
    }

    if (loading) {
        return <Splash/>
    }

    if (!loading && !token) {
        return <Navigate to="/auth/login" state={{pathname}}/>
    }

    return (
        <React.Fragment>
            {children}
        </React.Fragment>
    )
}

export default RequireAuth;
