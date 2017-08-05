import React from 'react';
import LatestEvent from './LatestEvent';
import organizationMock from '../../../mock/Organization.json';
import sinon from 'sinon';
import { browserHistory } from 'react-router';
jest.mock('react-router', ()=>({browserHistory: {push: jest.fn()}}))

describe("<LatestEvent />", () => {

    it("Matches snapshot", () => {
        const latestEvent = shallow(
            <LatestEvent organization={organizationMock}  />
        );
        expect(latestEvent).toMatchSnapshot();
    });

    it("Should redirect to organization on click", () => {
        
        const latestEvent = mount(
            <LatestEvent organization={organizationMock}  />
        );
        const callback = sinon.spy(latestEvent.instance(),'onLinkAction');
        const organizationLink = latestEvent.find('a');
        organizationLink.simulate('click');
        expect(callback.calledOnce).toEqual(true);
        expect(browserHistory.push).toHaveBeenCalled(); 
    });
}) 
