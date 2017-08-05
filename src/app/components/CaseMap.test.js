import React from 'react';
import CaseMap from './CaseMap';
import case_mock from '../../../mock/Case.json';
import actions_mock from '../../../mock/Actions.json';

describe('<CaseMap />', () => {

    it('Should match snapshot', () => {
        const caseMap = shallow(
            <CaseMap currentCase={case_mock.cases[0]} actions={actions_mock.actions} />
        );
        expect(caseMap).toMatchSnapshot();
    });
});