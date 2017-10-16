import * as constants from '../constants.js';
const initialState = {};

export default function reducer (state = initialState, action) {
    switch (action.type) {

        case 'JARNO': 
        {
            return {...state, data: action.payload};
        }
        default: {
            return state;
        }
    }
} 