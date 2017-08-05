import React from 'react';
import LatestEvent from './LatestEvent';
import organizationMock from '../../../mock/Organization.json';

describe("<LatestEvent />", () => {
    it("Matches snapshot", () => {
    const latestEvent = shallow(
        <LatestEvent organization={organizationMock}  />
    );
    expect(latestEvent).toMatchSnapshot();
    });
}) 
