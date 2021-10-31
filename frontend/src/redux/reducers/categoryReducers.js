import {
    NEW_MAIN_CATEGORY_REQUEST,
    NEW_MAIN_CATEGORY_SUCCESS,
    NEW_MAIN_CATEGORY_FAIL,
    GET_ALL_CATEGORIES_REQUEST,
    GET_ALL_CATEGORIES_SUCCESS,
    GET_ALL_CATEGORIES_FAIL
} from "../constants/categoryConstants";

export const categoryReducer = (state = {}, action) => {
    switch (action.type) {
        case NEW_MAIN_CATEGORY_REQUEST:
            return { loading: true };
        case NEW_MAIN_CATEGORY_SUCCESS:
            return { loading: false };
        case NEW_MAIN_CATEGORY_FAIL:
            return { loading: false, error: action.payload };

        case GET_ALL_CATEGORIES_REQUEST:
            return { loading: true };
        case GET_ALL_CATEGORIES_SUCCESS:
            return { loading: false, categories: action.payload };
        case GET_ALL_CATEGORIES_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};