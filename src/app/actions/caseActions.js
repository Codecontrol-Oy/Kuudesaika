import * as constants from '../constants.js';
import store from '../store';
import axios from 'axios';
import settings from '../settings.js';
import {getAPIUrl} from 'Actions';

export function fetchLatest () {
    axios.get(getAPIUrl() + settings.CASE + '?limit=1')
         .then(function (response) {
            const offset = response.data.count - 10;
            store.dispatch({
                    type: constants.CASE_FETCH_LATEST,
                    payload: axios.get(getAPIUrl() + settings.CASE + '?limit=10&offset=' + offset)
            });
         });
}

export function fetchCase (id) {
    store.dispatch({
        type: constants.CASE_FETCH,
        payload: axios.get(settings.API_ROOT_URL + settings.CASE + id)
    });
}
