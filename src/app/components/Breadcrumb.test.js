import React from 'react';
import Breadcrumb from './Breadcrumb';
import mock from '../../../mock/Geometries.json';
import {browserHistory} from 'react-router';

describe('<Breadcrumb />', () => {

    it('Should match snapshot', () => {
        const breadcrumb = shallow(
            <Breadcrumb path={browserHistory.getCurrentLocation()} />
        );
        expect(breadcrumb).toMatchSnapshot();
    });

    it('Should should render base anchors', () => {
        const breadcrumb = shallow(
            <Breadcrumb path={browserHistory.getCurrentLocation()} />
        );
        expect(breadcrumb.find('Anchor').length).toEqual(2);

    });
});