import { GET_ALL_SUBCATEGORIES_PER_CATEGORY_FAIL, GET_ALL_SUBCATEGORIES_PER_CATEGORY_REQUEST, GET_ALL_SUBCATEGORIES_PER_CATEGORY_SUCCESS } from "../constants/categoryConstants";
import axios from "axios";

export const getAllSubCategoriesForCategory = (categoryName) => async (dispatch) => {
    console.log("DISPATCHANOO");
    try {
        dispatch({ type: GET_ALL_SUBCATEGORIES_PER_CATEGORY_REQUEST }); //POZVAT CE CATEGORY REDUCER I POSTAVIT CE LOADING U TRUE
        const config = {
            headers: {
                "Content-type": "application/json",
            }
        };

        const { data } = await axios.post(
            "/api/category/subcategoryy",
            {
                categoryName
            },
            config
        );
        dispatch({ type: GET_ALL_SUBCATEGORIES_PER_CATEGORY_SUCCESS, payload: data }); //POZVAT CE CATEGORY REDUCER I POSTAVIT CE LOADING U FALSE
    } catch (error) {
        dispatch({
            type: GET_ALL_SUBCATEGORIES_PER_CATEGORY_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
}