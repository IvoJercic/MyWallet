import { NEW_MAIN_CATEGORY_REQUEST,NEW_MAIN_CATEGORY_SUCCESS,NEW_MAIN_CATEGORY_FAIL, GET_ALL_CATEGORIES_REQUEST, GET_ALL_CATEGORIES_FAIL, GET_ALL_CATEGORIES_SUCCESS } from "../constants/categoryConstants";

import axios from "axios";

export const createNewMainCategory = (name, color, icon) => async (dispatch) => {
    console.log("DISPATCH: "+name, color, icon);
    try {
        dispatch({ type: NEW_MAIN_CATEGORY_REQUEST }); //POZVAT CE CATEGORY REDUCER I POSTAVIT CE LOADING U TRUE
        const config = {
            headers: {
                "Content-type": "application/json",
            },
        };

        const { data } = await axios.post(
            "/api/category",
            {
                name,
                color,
                icon
            },
            config
        );
        dispatch({type:NEW_MAIN_CATEGORY_SUCCESS}); //POZVAT CE CATEGORY REDUCER I POSTAVIT CE LOADING U FALSE

    } catch (error) {
        dispatch({
            type:NEW_MAIN_CATEGORY_FAIL,
            payload:
            error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
        });

    }
}

export const getAllCategories = () => async (dispatch) => {
    try {
        dispatch({ type: GET_ALL_CATEGORIES_REQUEST }); //POZVAT CE CATEGORY REDUCER I POSTAVIT CE LOADING U TRUE
        const config = {
            headers: {
                "Content-type": "application/json",
            }
        };

        const { data } = await axios.get("/api/category",  config);
        dispatch({type:GET_ALL_CATEGORIES_SUCCESS,payload:data}); //POZVAT CE CATEGORY REDUCER I POSTAVIT CE LOADING U FALSE
    } catch (error) {
        dispatch({
            type:GET_ALL_CATEGORIES_FAIL,
            payload:
            error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
        });
    }
}