import {INVITATIONS_ACTION_TYPES} from "./invitation-action-types";

const INITIAL_STATE = {
    invitations: [],
    invitationLoading: false,
    invitationError: null,
    totalInvitations: 0,
    page: 0
};

const invitationReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {

        case INVITATIONS_ACTION_TYPES.GET_INVITATIONS_REQUEST:
            return {
                ...state,
                invitationError: null,
                invitationLoading: true
            }

        case INVITATIONS_ACTION_TYPES.GET_INVITATIONS_SUCCESS:
            return {
                ...state,
                invitationError: null,
                invitationLoading: false,
                invitations: action.payload.data,
                totalInvitations: action.payload.count
            }

        case INVITATIONS_ACTION_TYPES.GET_INVITATIONS_FAIL:
            return {
                ...state,
                invitationError: action.payload,
                invitationLoading: false
            }

        case INVITATIONS_ACTION_TYPES.PREVIOUS_PAGE:
            return {
                ...state,
                page: state.page - 1
            }

        case INVITATIONS_ACTION_TYPES.NEXT_PAGE:
            return {
                ...state,
                page: state.page + 1
            }
        case INVITATIONS_ACTION_TYPES.GO_TO_PAGE:
            return {
                ...state,
                page: action.payload
            }


        case INVITATIONS_ACTION_TYPES.CREATE_INVITATION_REQUEST:
            return {
                ...state,
                invitationError: null,
                invitationLoading: true
            }

        case INVITATIONS_ACTION_TYPES.CREATE_INVITATION_SUCCESS:
            return {
                ...state,
                invitationError: null,
                invitationLoading: false,
                invitations: [...state.invitations, action.payload],
                totalInvitations: state.totalInvitations + 1
            }

        case INVITATIONS_ACTION_TYPES.CREATE_INVITATION_FAIL:
            return {
                ...state,
                invitationError: action.payload,
                invitationLoading: false
            }


        case INVITATIONS_ACTION_TYPES.REJECT_INVITATION_REQUEST:
            return {
                ...state,
                invitationError: null,
                invitationLoading: true
            }

        case INVITATIONS_ACTION_TYPES.REJECT_INVITATION_SUCCESS:
            return {
                ...state,
                invitationError: null,
                invitationLoading: false,
                invitations: [...state.invitations.map(invitation => {
                    if (invitation._id === action.payload._id) return {...action.payload}
                    return invitation;
                })]
            }

        case INVITATIONS_ACTION_TYPES.REJECT_INVITATION_FAIL:
            return {
                ...state,
                invitationError: action.payload,
                invitationLoading: false
            }

        case INVITATIONS_ACTION_TYPES.ACCEPT_INVITATION_REQUEST:
            return {
                ...state,
                invitationError: null,
                invitationLoading: true
            }

        case INVITATIONS_ACTION_TYPES.ACCEPT_INVITATION_SUCCESS:
            return {
                ...state,
                invitationError: null,
                invitationLoading: false,
                invitations: [...state.invitations.map(invitation => {
                    if (invitation._id === action.payload._id) return {...action.payload}
                    return invitation;
                })]
            }

        case INVITATIONS_ACTION_TYPES.ACCEPT_INVITATION_FAIL:
            return {
                ...state,
                invitationError: action.payload,
                invitationLoading: false
            }


        case INVITATIONS_ACTION_TYPES.REVOKE_INVITATION_REQUEST:
            return {
                ...state,
                invitationError: null,
                invitationLoading: true
            }

        case INVITATIONS_ACTION_TYPES.REVOKE_INVITATION_SUCCESS:
            return {
                ...state,
                invitationError: null,
                invitationLoading: false,
                invitations: [...state.invitations.map(invitation => {
                    if (invitation._id === action.payload._id) return {...action.payload}
                    return invitation;
                })]
            }

        case INVITATIONS_ACTION_TYPES.REVOKE_INVITATION_FAIL:
            return {
                ...state,
                invitationError: action.payload,
                invitationLoading: false
            }
        default:
            return state;
    }
}

export const selectInvitations = state => state.invitations;

export default invitationReducer;
