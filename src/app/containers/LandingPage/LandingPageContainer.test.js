import React from 'react';
import LandingPageContainer from './LandingPageContainer';
import sinon from 'sinon';
import { browserHistory } from 'react-router';
jest.mock('react-router', ()=>({browserHistory: {push: jest.fn()}}))

describe("<LandingPageContainer />", () => {

    it("Matches snapshot", () => {
        const landingPageContainer = shallow(
            <LandingPageContainer />
        );
        expect(landingPageContainer).toMatchSnapshot();
    });

    it("Should render city cards", () => { 
        const landingPageContainer = shallow(
            <LandingPageContainer />
        );
        expect(landingPageContainer.find('Card').length).toEqual(6);
    });

    it("Should redirect to city on click", () => { 
        const landingPageContainer = shallow(
            <LandingPageContainer />
        );
        const callback = sinon.spy(landingPageContainer.instance(),'onSelectCity');
        const organizationLink = landingPageContainer.find('Card');
        organizationLink.first().simulate('click');
        expect(callback.calledOnce).toEqual(true);
        expect(browserHistory.push).toHaveBeenCalled(); 
    });
}) 
