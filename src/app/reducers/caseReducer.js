import * as constants from '../constants.js';
const initialState = {};

export default function reducer (state = initialState, action) {
    switch (action.type) {
        case constants.CASE_FETCH_LATEST: {
            return state;
        }
        case constants.CASE_FETCH_LATEST_PENDING: {
            return {...state, pending: true};
        }
        case constants.CASE_FETCH_LATEST_REJECTED: {
            return {...state, pending: false};
        }
        case constants.CASE_FETCH_LATEST_FULFILLED: {
            return {...state, latest_cases: action.payload.data, pending: false};
        }
        case constants.CASE_FETCH: {
            return state;
        }
        case constants.CASE_FETCH_PENDING: {
            return {...state, pending: true};
        }
        case constants.CASE_FETCH_REJECTED: {
            return {...state, pending: false};
        }
        case constants.CASE_FETCH_FULFILLED: {
            return {...state, selected_case: action.payload.data, pending: false};
        }
        default: {
            return state;
        }
    }
}
