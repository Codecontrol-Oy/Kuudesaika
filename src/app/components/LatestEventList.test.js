import React from 'react';
import LatestEventList from './LatestEventList';
import org_mock from '../../../mock/Organizations.json';
import event_mock from '../../../mock/Events.json';
import sinon from 'sinon';
import { browserHistory } from 'react-router';
jest.mock('react-router', ()=>({browserHistory: {push: jest.fn()}}))

describe("<LatestEventList />", () => {

    it("Matches snapshot", () => {
        const latestEventList = shallow(
            <LatestEventList organizations={org_mock.organizations} latestEvents={event_mock.events}  />
        );
        expect(latestEventList).toMatchSnapshot();
    });

    it("Should render LatestEvent components", () => {
        const latestEventList = shallow(
            <LatestEventList organizations={org_mock.organizations} latestEvents={event_mock.events}  />
        );
        expect(latestEventList.find('LatestEvent').length).toEqual(20);
    });
}) 