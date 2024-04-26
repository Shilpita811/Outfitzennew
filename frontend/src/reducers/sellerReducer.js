import {
    APPLICATION_REQUEST,
    APPLICATION_FAIL,
    APPLICATION_SECCESS,
    ALL_APPLICATIONS_REQUEST,
    ALL_APPLICATIONS_FAIL,
    ALL_APPLICATIONS_SECCESS,
    CLEAR_ERRORS,
    DELETE_APPLICATIONS_REQUEST,
    DELETE_APPLICATIONS_SUCCESS,
    DELETE_APPLICATIONS_FAIL,
    DELETE_APPLICATIONS_RESET,
    UPDATE_APPLICATIONS_REQUEST,
    UPDATE_APPLICATIONS_SUCCESS,
    UPDATE_APPLICATIONS_FAIL,
    UPDATE_APPLICATIONS_RESET,
    APPLICATIONS_DETAILS_REQUEST,
    APPLICATIONS_DETAILS_SUCCESS,
    APPLICATIONS_DETAILS_FAIL,
} from "../constants/sellerConstants";

export const sellerRequestReducer = (state = { requests: [] }, action) => {
    switch (action.type) {
        case APPLICATION_REQUEST:
            //case ALL_APPLICATIONS_REQUEST:
            return {
                loading: true,
                requests: [],
            }
        case APPLICATION_SECCESS:
            return {
                loading: false,
                success: action.payload.success,
                // requests: action.payload.requests,
            }
        // case ALL_APPLICATIONS_SECCESS:
        //     return {
        //         loading: false,
        //         requests: action.payload,
        //     };
        case APPLICATION_FAIL:
            //case ALL_APPLICATIONS_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state;
    }
};

export const allApplicationReducer = (state = { requests: [] }, action) => {
    switch (action.type) {
        case ALL_APPLICATIONS_REQUEST:
            return {
                loading: true,
                requests: [],
            };
        case ALL_APPLICATIONS_SECCESS:
            return {
                loading: false,
                requests: action.payload,
            };
        case ALL_APPLICATIONS_FAIL:
            return {
                loading: false,
                error: action.payload,
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state;

    }
};

export const applicationReducer = (state = {}, action) => {
    switch (action.type) {
        case UPDATE_APPLICATIONS_REQUEST:
        case DELETE_APPLICATIONS_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case UPDATE_APPLICATIONS_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload,
            }
        case DELETE_APPLICATIONS_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload,
            };
        case UPDATE_APPLICATIONS_FAIL:
        case DELETE_APPLICATIONS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            }
        case UPDATE_APPLICATIONS_RESET:
            return {
                ...state,
                isUpdated: false,
            }
        case DELETE_APPLICATIONS_RESET:
            return {
                ...state,
                isDeleted: false,
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state;
    }
};

export const requestDetailsReducer = (state = { request: {} }, action) => {
    switch (action.type) {
        case APPLICATIONS_DETAILS_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case APPLICATIONS_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false,
                request: action.payload,
            };
        case APPLICATIONS_DETAILS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }
}