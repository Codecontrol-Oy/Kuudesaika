import * as constants from '../constants.js';
import store from '../store';
import axios from 'axios';
import settings from '../settings.js';

export function fetchAction (id) {
    store.dispatch({
        type: constants.ACTION_FETCH,
        payload: axios.get(settings.API_ROOT_URL + settings.ACTION + id)
    });
}
