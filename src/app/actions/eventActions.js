import * as constants from '../constants.js';
import store from '../store';
import {browserHistory} from 'react-router';
import axios from 'axios';
import settings from '../settings.js';

export function fetchLatestEvents() {
    axios.get(settings.API_ROOT_URL + settings.EVENT + "?limit=1")
         .then(function(response) {
            const offset = response.data.count - 10;
            store.dispatch({
                    type: constants.EVENT_FETCH_LATEST, 
                    payload: axios.get(settings.API_ROOT_URL + settings.EVENT + "?limit=10&offset="+offset)
            });
         })
}

