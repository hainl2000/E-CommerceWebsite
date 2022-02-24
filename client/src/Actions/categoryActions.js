import { constance as ACTIONS } from "../constance"
import axios from 'axios'

export const fetchCategory = () => {
    return dispatch => {
        axios.get('http://localhost:8000/getListCategories').then(response => {
            return response.data.listCategories
        }).then(list => {
            dispatch({
                type: ACTIONS.FETCH_CATEGORY,
                categories: list
            })
        })
    }
}

export const selectCategory = (id) => {
    return {
        type: ACTIONS.SELECT_CATEGORY,
        id: id
    }
}