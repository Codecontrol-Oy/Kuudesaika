import * as constants from '../constants.js';
import store from '../store';
import {browserHistory} from 'react-router';
import axios from 'axios';
import settings from '../settings.js';

export function fetchOrganizations() {
    store.dispatch({
        type: constants.ORGANIZATION_FETCH_LIST, 
        payload: axios.get(settings.API_ROOT_URL + settings.ORGANIZATION + "?limit=500")
    });
}

export function fetchOrganization(id) {
    store.dispatch({
        type: constants.ORGANIZATION_FETCH, 
        payload: axios.get(settings.API_ROOT_URL + settings.ORGANIZATION + id)
    });
}