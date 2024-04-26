import axios from "axios";
import{
    APPLICATION_REQUEST,
    APPLICATION_FAIL,
    APPLICATION_SECCESS,
    CLEAR_ERRORS,
    ALL_APPLICATIONS_REQUEST,
    ALL_APPLICATIONS_SECCESS,
    ALL_APPLICATIONS_FAIL,
    DELETE_APPLICATIONS_REQUEST,
    DELETE_APPLICATIONS_SUCCESS,
    DELETE_APPLICATIONS_FAIL,
    UPDATE_APPLICATIONS_REQUEST,
    UPDATE_APPLICATIONS_SUCCESS,
    UPDATE_APPLICATIONS_FAIL,
    APPLICATIONS_DETAILS_REQUEST,
    APPLICATIONS_DETAILS_SUCCESS,
    APPLICATIONS_DETAILS_FAIL,
} from "../constants/sellerConstants";

export const sellerRequest = (sellerData) => async (dispatch) => {
    try{
        dispatch({ type: APPLICATION_REQUEST });
        const config = {
            headers: { "Content-Type": "application/json" },
        };
        const { data } = await axios.post(
            `/api/v1//seller`,
            sellerData,
            config
        );
        dispatch({
            type: APPLICATION_SECCESS,
            payload: data,
        });
    }
    catch (error){
        dispatch({
            type: APPLICATION_FAIL,
            payload: error.response.data.message,
        });
    }
};

// get all request
export const getAllSellerRequest = () => async (dispatch) =>{
    try {
        dispatch({ type: ALL_APPLICATIONS_REQUEST });
    
        const { data } = await axios.get("/api/v1/admin/request");
        
    
        dispatch({
          type: ALL_APPLICATIONS_SECCESS,
          payload: data.sellers,
        });
      } catch (error) {
        dispatch({
          type: ALL_APPLICATIONS_FAIL,
          payload: error.response.data.message,
        });
      }
};

// get request Details
export const getSellerRequestDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: APPLICATIONS_DETAILS_REQUEST });
        const { data } = await axios.get(`/api/v1/admin/request/${id}`);
        dispatch({ type: APPLICATIONS_DETAILS_SUCCESS, payload:data.request });
    }catch(error){
        dispatch({ type: APPLICATIONS_DETAILS_FAIL, payload: error.response.data.message});
    }
};

// Delete Request
export const deleteRequest = (id) => async (dispatch) => {
    try{
        dispatch({ type: DELETE_APPLICATIONS_REQUEST });
        const { data } = await axios.delete(`/api/v1/admin/request/${id}`);
        dispatch({ type: DELETE_APPLICATIONS_SUCCESS, payload: data.success });
    }catch(error){
        dispatch({
            type: DELETE_APPLICATIONS_FAIL,
            payload: error.response.data.message,
        });
    };
};

// Update Request

export const updateRequest = (id, request) => async(dispatch)=>{
    try{
        dispatch({ type: UPDATE_APPLICATIONS_REQUEST });
        const config = {
            headers:{
                'Content-Type': 'application/json'
            },
        };
        const { data } = await axios.put(`/api/v1/admin/request/${id}`, request, config);
        dispatch({ type: UPDATE_APPLICATIONS_SUCCESS, payload: data.success });
    }catch(error){
        dispatch({
            type: UPDATE_APPLICATIONS_FAIL,
            payload: error.response.data.message,
        })
    }
}

// Clearing Errors
export const clearErrors = () => async(dispatch)=>{
    dispatch({
        type: CLEAR_ERRORS,
    })
}