import {
    GET_ALL_SUBCATEGORIES_PER_CATEGORY_REQUEST,
    GET_ALL_SUBCATEGORIES_PER_CATEGORY_SUCCESS,
    GET_ALL_SUBCATEGORIES_PER_CATEGORY_FAIL
} from "../constants/categoryConstants";

export const subCategoryReducer = (state = {}, action) => {
    switch (action.type) {
             case GET_ALL_SUBCATEGORIES_PER_CATEGORY_REQUEST:
            return { loading: true };
        case GET_ALL_SUBCATEGORIES_PER_CATEGORY_SUCCESS:
            return { loading: false, subcategoriesList: action.payload };
        case GET_ALL_SUBCATEGORIES_PER_CATEGORY_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};