import {applyMiddleware, createStore} from "redux";
import rootReducer from "./root-reducer";
import thunk from "redux-thunk";
import {STREAMING_RESOURCE_GH_TOKEN_KEY, STREAMING_RESOURCE_GH_USER_KEY} from "../constants/constants";

const user = localStorage.getItem(STREAMING_RESOURCE_GH_USER_KEY) ? JSON.parse(localStorage.getItem(STREAMING_RESOURCE_GH_USER_KEY)) : null;
const token = localStorage.getItem(STREAMING_RESOURCE_GH_TOKEN_KEY) ? JSON.parse(localStorage.getItem(STREAMING_RESOURCE_GH_TOKEN_KEY)) : "";

const INITIAL_STATE = {
    auth: {user, token}
}

const store = createStore(rootReducer, INITIAL_STATE, applyMiddleware(thunk));

export default store;