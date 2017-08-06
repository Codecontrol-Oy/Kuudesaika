import React from 'react';
import CaseContainer from './CaseContainer';
import sinon from 'sinon';
import configureStore from 'redux-mock-store';
const mockStore = configureStore();
const dispatch = sinon.spy();
describe("<CaseContainer />", () => {

    it("Matches snapshot", () => {
        const caseContainer = shallow(
            <CaseContainer dispatch={dispatch} store={ mockStore(   { case : 
                                                                        { selected_case: {}, 
                                                                           latest_cases: {}
                                                                        }})} />
        );
        expect(caseContainer).toMatchSnapshot();
    });
}) 
