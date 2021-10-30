import { NEW_MAIN_CATEGORY_REQUEST,NEW_MAIN_CATEGORY_SUCCESS,NEW_MAIN_CATEGORY_FAIL } from "../constants/categoryConstants";

import axios from "axios";

export const createNewMainCategory = (name, color, icon) => async (dispatch) => {
    console.log("DISPATCH: "+name, color, icon);
    try {
        dispatch({ type: NEW_MAIN_CATEGORY_REQUEST }); //POZVAT CE USER REDUCER I POSTAVIT CE LOADING U TRUE
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