import * as constants from '../constants.js';
import store from '../store';
import axios from 'axios';
import settings from '../settings.js';
import {getAPIUrl} from 'Actions';

export function fetchAction (id) {

    store.dispatch({
        type: constants.ACTION_FETCH,
        payload: axios.get(getAPIUrl() + settings.ACTION + id)
    });
}
