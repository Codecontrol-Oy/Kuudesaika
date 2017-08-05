import React from 'react';
import LatestCaseList from './LatestCaseList';
import Label from 'grommet/components/Label';
import mock from '../../../mock/Case.json';
import axios from 'axios';
import sinon from 'sinon';
import {get} from 'axios';

describe("<LatestCaseList />", () => {
    it("Matches snapshot", () => {
        const latestCaseList = shallow(
            <LatestCaseList latestCases={[]} />
        );
        expect(latestCaseList).toMatchSnapshot();
    });

    it('should contain three LatestCase elements', () => {
        const promise = Promise.resolve(mock.function);
        sinon.stub(axios, 'get').callsFake(() => promise)
        const latestCaseList = mount(
            <LatestCaseList latestCases={mock.cases} />
        );
        return promise.then(() => {
            expect(latestCaseList.find("LatestCase").length).toEqual(3);
        })   
    });

})
