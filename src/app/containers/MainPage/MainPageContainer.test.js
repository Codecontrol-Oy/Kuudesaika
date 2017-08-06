import React from 'react';
import MainPageContainer from './MainPageContainer';
import sinon from 'sinon';
import configureStore from 'redux-mock-store';
const mockStore = configureStore();
const dispatch = sinon.spy();
describe("<MainPageContainer />", () => {

    it("Matches snapshot", () => {
        const mainPageContainer = shallow(
            <MainPageContainer dispatch={dispatch} store={mockStore({ organization: {}, case: {}, event: {} })} />
        );
        expect(mainPageContainer).toMatchSnapshot();
    });
}) 
