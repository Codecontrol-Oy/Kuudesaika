import React from 'react';
import LatestCaseList from './LatestCaseList';
import Label from 'grommet/components/Label';

describe("<LatestCase />", () => {
    it("Matches snapshot", () => {
    const latestCase = shallow(
        <LatestCaseList latestCases={[]} />
    );

    expect(latestCase).toMatchSnapshot();
    });

    it('should contain correct elements', () => {


    });

    it('Latest case should contain correct values', () => {

    });

})
