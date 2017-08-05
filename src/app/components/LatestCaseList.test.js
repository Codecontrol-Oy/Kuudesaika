import React from 'react';
import LatestCaseList from './LatestCaseList';
import Label from 'grommet/components/Label';
import mock from '../../../mock/Case.json';
import axios from 'axios';
import {get} from 'axios';
import MockAdapter from 'axios-mock-adapter';

describe("<LatestCaseList />", () => {
    it("Matches snapshot", () => {
        const latestCaseList = shallow(
            <LatestCaseList latestCases={[]} />
        );
        expect(latestCaseList).toMatchSnapshot();
    });

    it('should contain correct elements', () => {

        var axios_mock = new MockAdapter(axios);
        axios_mock.onGet().reply(200, mock.function);

        const latestCaseList = mount(
            <LatestCaseList latestCases={mock.cases} />
        );
        latestCaseList.update();
        setTimeout(()=>{
            expect(latestCaseList.find("LatestCase").length).toEqual(3);
            done();
        },1000)
    });

})
