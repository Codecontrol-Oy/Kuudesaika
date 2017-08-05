import * as constants from '../constants.js';
import settings from '../settings.js';

export function getAPIUrl () {
    
    const city = localStorage.getItem('city');
    if(!city) {
        localStorage.setItem('city', 'Helsinki');
    }
    
    switch(city)
    {
        case "Helsinki": {
            return settings.API_ROOT_URL_HELSINKI;
        }
        case "Vantaa": {
            return settings.API_ROOT_URL_VANTAA;
        }
        case "Turku": {
            return settings.API_ROOT_URL_TURKU;
        }
        case "Oulu": {
            return settings.API_ROOT_URL_OULU;
        }
        case "Tampere": {
            return settings.API_ROOT_URL_TAMPERE;
        }
        case "Espoo": {
            return settings.API_ROOT_URL_ESPOO;
        }
    }
}

export function setCity (city) {
    if(localStorage.getItem('city') != city) {
        localStorage.setItem('city', city);
    }
}

export function getCity () {
    return localStorage.getItem('city');
}
