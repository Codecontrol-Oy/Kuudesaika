import React from 'react';
import OrganizationContainer from './OrganizationContainer';
import sinon from 'sinon';
import configureStore from 'redux-mock-store';
const mockStore = configureStore();
const dispatch = sinon.spy();
describe("<OrganizationContainer />", () => {

    it("Matches snapshot", () => {
        const organizationContainer = shallow(
            <OrganizationContainer dispatch={dispatch} store={mockStore({ organization: {} })} />
        );
        expect(organizationContainer).toMatchSnapshot();
    });
}) 
