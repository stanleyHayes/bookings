import axios from "axios";
import {INVITATIONS_ACTION_TYPES} from "./invitation-action-types";
import {STREAMING_RESOURCE_GH_SERVER_URL} from "../../constants/constants";

const nextPage = () => {
    return {
        type: INVITATIONS_ACTION_TYPES.NEXT_PAGE
    }
}

const previousPage = () => {
    return {
        type: INVITATIONS_ACTION_TYPES.PREVIOUS_PAGE
    }
}

const goToPage = page => {
    return {
        type: INVITATIONS_ACTION_TYPES.GO_TO_PAGE,
        payload: page
    }
}

const createInvitationRequest = () => {
    return {
        type: INVITATIONS_ACTION_TYPES.CREATE_INVITATION_REQUEST
    }
}

const createInvitationSuccess = (data) => {
    return {
        type: INVITATIONS_ACTION_TYPES.CREATE_INVITATION_SUCCESS,
        payload: data
    }
}

const createInvitationFailure = message => {
    return {
        type: INVITATIONS_ACTION_TYPES.CREATE_INVITATION_FAIL,
        payload: message
    }
}

const createInvitation = (invitation, token, handleClose) => {
    return async dispatch => {
        try {
            dispatch(createInvitationRequest());
            const response = await axios({
                method: 'POST',
                url: `${STREAMING_RESOURCE_GH_SERVER_URL}/invitations`,
                data: invitation,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const {data} = response.data;
            dispatch(createInvitationSuccess(data));
            handleClose();
        } catch (e) {
            const {message} = e.response.data;
            dispatch(createInvitationFailure(message));
        }
    }
}


const getInvitationRequest = () => {
    return {
        type: INVITATIONS_ACTION_TYPES.GET_INVITATION_REQUEST
    }
}

const getInvitationSuccess = (client, message) => {
    return {
        type: INVITATIONS_ACTION_TYPES.GET_INVITATION_SUCCESS,
        payload: {message, client}
    }
}

const getInvitationFailure = message => {
    return {
        type: INVITATIONS_ACTION_TYPES.GET_INVITATION_FAIL,
        payload: message
    }
}

const getInvitation = (ID, token) => {
    return async dispatch => {
        try {
            dispatch(getInvitationRequest());
            const response = await axios({
                method: 'GET',
                url: `${STREAMING_RESOURCE_GH_SERVER_URL}/invitations/${ID}`,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const {message, data} = response.data;
            dispatch(getInvitationSuccess(data, message));
        } catch (e) {
            const {message} = e.response.data;
            dispatch(getInvitationFailure(message));
        }
    }
}


const getInvitationsRequest = () => {
    return {
        type: INVITATIONS_ACTION_TYPES.GET_INVITATIONS_REQUEST
    }
}

const getInvitationsSuccess = (data, count) => {
    return {
        type: INVITATIONS_ACTION_TYPES.GET_INVITATIONS_SUCCESS,
        payload: {data, count}
    }
}

const getInvitationsFailure = message => {
    return {
        type: INVITATIONS_ACTION_TYPES.GET_INVITATIONS_FAIL,
        payload: message
    }
}

const getInvitations = token => {
    return async dispatch => {
        try {
            dispatch(getInvitationsRequest());
            const response = await axios({
                method: 'GET',
                url: `${STREAMING_RESOURCE_GH_SERVER_URL}/invitations`,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const {data, count} = response.data;
            dispatch(getInvitationsSuccess(data, count));
        } catch (e) {
            const {message} = e.response.data;
            dispatch(getInvitationsFailure(message));
        }
    }
}


const updateInvitationRequest = () => {
    return {
        type: INVITATIONS_ACTION_TYPES.UPDATE_INVITATION_REQUEST
    }
}

const updateInvitationSuccess = (invitation, message) => {
    return {
        type: INVITATIONS_ACTION_TYPES.UPDATE_INVITATION_SUCCESS,
        payload: {message, invitation}
    }
}

const updateInvitationFailure = message => {
    return {
        type: INVITATIONS_ACTION_TYPES.UPDATE_INVITATION_FAIL,
        payload: message
    }
}

const updateInvitation = (invitation, ID, token) => {
    return async dispatch => {
        try {
            dispatch(updateInvitationRequest());
            const response = await axios({
                method: 'PUT',
                url: `${STREAMING_RESOURCE_GH_SERVER_URL}/invitations/${ID}`,
                data: invitation,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const {message, data} = response.data;
            dispatch(updateInvitationSuccess(data, message));
        } catch (e) {
            const {message} = e.response.data;
            dispatch(updateInvitationFailure(message));
        }
    }
}


const deleteInvitationRequest = () => {
    return {
        type: INVITATIONS_ACTION_TYPES.DELETE_INVITATION_REQUEST
    }
}

const deleteInvitationSuccess = (invitation, message) => {
    return {
        type: INVITATIONS_ACTION_TYPES.DELETE_INVITATION_SUCCESS,
        payload: {message, invitation}
    }
}

const deleteInvitationFailure = message => {
    return {
        type: INVITATIONS_ACTION_TYPES.DELETE_INVITATION_FAIL,
        payload: message
    }
}

const deleteInvitation = (ID, token) => {
    return async dispatch => {
        try {
            dispatch(deleteInvitationRequest());
            const response = await axios({
                method: 'DELETE',
                url: `${STREAMING_RESOURCE_GH_SERVER_URL}/invitations/${ID}`,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const {message, data} = response.data;
            dispatch(deleteInvitationSuccess(data, message));
        } catch (e) {
            const {message} = e.response.data;
            dispatch(deleteInvitationFailure(message));
        }
    }
}


const revokeInvitationRequest = () => {
    return {
        type: INVITATIONS_ACTION_TYPES.GET_INVITATIONS_REQUEST
    }
}

const revokeInvitationSuccess = (data, count) => {
    return {
        type: INVITATIONS_ACTION_TYPES.GET_INVITATIONS_SUCCESS,
        payload: {data, count}
    }
}

const revokeInvitationFailure = message => {
    return {
        type: INVITATIONS_ACTION_TYPES.GET_INVITATIONS_FAIL,
        payload: message
    }
}

const revokeInvitation = (ID, token) => {
    return async dispatch => {
        try {
            dispatch(revokeInvitationRequest());
            const response = await axios({
                method: 'PUT',
                url: `${STREAMING_RESOURCE_GH_SERVER_URL}/invitations/${ID}/revoke`,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const {data, count} = response.data;
            dispatch(revokeInvitationSuccess(data, count));
        } catch (e) {
            const {message} = e.response.data;
            dispatch(revokeInvitationFailure(message));
        }
    }
}


const acceptInvitationRequest = () => {
    return {
        type: INVITATIONS_ACTION_TYPES.ACCEPT_INVITATION_REQUEST
    }
}

const acceptInvitationSuccess = (invitation) => {
    return {
        type: INVITATIONS_ACTION_TYPES.ACCEPT_INVITATION_SUCCESS,
        payload: invitation
    }
}

const acceptInvitationFailure = message => {
    return {
        type: INVITATIONS_ACTION_TYPES.ACCEPT_INVITATION_FAIL,
        payload: message
    }
}

const acceptInvitation = (invitation, ID) => {
    return async dispatch => {
        try {
            dispatch(acceptInvitationRequest());
            const response = await axios({
                method: 'PUT',
                url: `${STREAMING_RESOURCE_GH_SERVER_URL}/invitations/${ID}/accept`,
                data: invitation,
            });
            const {message, data} = response.data;
            dispatch(acceptInvitationSuccess(data, message));
            dispatch(nextPage());
        } catch (e) {
            const {message} = e.response.data;
            dispatch(acceptInvitationFailure(message));
        }
    }
}


const rejectInvitationRequest = () => {
    return {
        type: INVITATIONS_ACTION_TYPES.REJECT_INVITATION_REQUEST
    }
}

const rejectInvitationSuccess = (invitation) => {
    return {
        type: INVITATIONS_ACTION_TYPES.REJECT_INVITATION_SUCCESS,
        payload: invitation
    }
}

const rejectInvitationFailure = message => {
    return {
        type: INVITATIONS_ACTION_TYPES.REJECT_INVITATION_FAIL,
        payload: message
    }
}

const rejectInvitation = (ID) => {
    return async dispatch => {
        try {
            dispatch(rejectInvitationRequest());
            const response = await axios({
                method: 'PUT',
                url: `${STREAMING_RESOURCE_GH_SERVER_URL}/invitations/${ID}/reject`,
            });
            const {data} = response.data;
            dispatch(rejectInvitationSuccess(data));
        } catch (e) {
            const {message} = e.response.data;
            dispatch(rejectInvitationFailure(message));
        }
    }
}


export const INVITATION_ACTION_CREATORS = {
    createInvitation,
    deleteInvitation,
    updateInvitation,
    getInvitations,
    getInvitation,
    nextPage,
    previousPage,
    goToPage,
    revokeInvitation,
    acceptInvitation,
    rejectInvitation
};
