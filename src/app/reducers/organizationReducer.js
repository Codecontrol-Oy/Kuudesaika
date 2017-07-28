import * as constants from '../constants.js';
const initialState = {};

export default function reducer (state = initialState, action) {
    switch(action.type) {
        case constants.ORGANIZATION_FETCH: {
            return state;
        }
        case constants.ORGANIZATION_FETCH_PENDING: {
            return {...state};
        }
        case constants.ORGANIZATION_FETCH_REJECTED: {
            return {...state};
        }
        case constants.ORGANIZATION_FETCH_FULFILLED: {
            return {...state, selected_organization: action.payload.data};
        }
        case constants.ORGANIZATION_FETCH_LIST: {
            return state;
        }
        case constants.ORGANIZATION_FETCH_LIST_PENDING: {
            return {...state};
        }
        case constants.ORGANIZATION_FETCH_LIST_REJECTED: {
            return {...state};
        }
        case constants.ORGANIZATION_FETCH_LIST_FULFILLED: {
            return {...state, organizations: action.payload.data};
        }
        default: {
            return state;
        }
    }
} 