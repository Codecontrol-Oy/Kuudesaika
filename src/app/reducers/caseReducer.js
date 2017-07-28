import * as constants from '../constants.js';
const initialState = {};

export default function reducer (state = initialState, action) {
    switch(action.type) {
        case constants.CASE_FETCH_LATEST: {
            return state;
        }
        case constants.CASE_FETCH_LATEST_PENDING: {
            return {...state};
        }
        case constants.CASE_FETCH_LATEST_REJECTED: {
            return {...state};
        }
        case constants.CASE_FETCH_LATEST_FULFILLED: {
            return {...state, latest_cases: action.payload.data};
        }
        default: {
            return state;
        }
    }
} 