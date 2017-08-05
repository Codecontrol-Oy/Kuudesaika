import React from 'react';
import CaseGeo from './CaseGeo';
import mock from '../../../mock/Geometries.json';

describe('<CaseGeo />', () => {

    it('Should match snapshot', () => {
        const caseGeo = shallow(
            <CaseGeo geometries={mock.geometries} />
        );
        expect(caseGeo).toMatchSnapshot();
    });

    it('Should should render map', () => {
        const caseGeo = shallow(
            <CaseGeo geometries={mock.geometries} />
        );
        expect(caseGeo.find('Map').length).toEqual(1);

    });
});