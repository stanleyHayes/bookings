import React, {useEffect} from "react";
import {Redirect, Route, useHistory} from "react-router-dom";
import {STREAMING_RESOURCE_GH_TOKEN_KEY} from "../../constants/constants";
import {useDispatch} from "react-redux";
import {getProfile} from "../../redux/authentication/auth-action-creators";

const ProtectedRoute = ({component: Component, ...rest}) => {
    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        const token = JSON.parse(localStorage.getItem(STREAMING_RESOURCE_GH_TOKEN_KEY));
        if (!token)
            return history.push('/auth/login');
        dispatch(getProfile(token));
    }, [dispatch, history]);

    return (
        <Route {...rest} render={(location, ...props) => {
            const token = JSON.parse(localStorage.getItem(STREAMING_RESOURCE_GH_TOKEN_KEY));
            if (!token)
                return <Redirect to="/auth/login" from={location}/>
            else
                return <Component {...props} />
        }}/>
    )
}

export default ProtectedRoute;
