import * as constants from '../constants.js';
import store from '../store';
import axios from 'axios';
import settings from '../settings.js';
import {getAPIUrl} from 'Actions';

export function fetchOrganizations () {
    store.dispatch({
        type: constants.ORGANIZATION_FETCH_LIST,
        payload: axios.get(getAPIUrl() + settings.ORGANIZATION + '?limit=500')
    });
}

export function fetchOrganization (id) {
    store.dispatch({
        type: constants.ORGANIZATION_FETCH,
        payload: axios.get(getAPIUrl() + settings.ORGANIZATION + id)
    });
}
