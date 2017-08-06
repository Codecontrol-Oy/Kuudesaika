import React from 'react';
import App from './App';
import sinon from 'sinon';
import configureStore from 'redux-mock-store';
const mockStore = configureStore();
const dispatch = sinon.spy();

describe("<App />", () => {
    it("Matches snapshot", () => {
        const app = shallow(
            <App />
        );
        expect(app).toMatchSnapshot();
    });
}) 