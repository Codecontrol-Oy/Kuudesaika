import React from 'react';
import OrganizationMap from './OrganizationMap';
import mock from '../../../mock/Organization.json';
import orgs_mock from '../../../mock/Organizations.json';
import axios from 'axios';
import sinon from 'sinon';
import {get} from 'axios';

describe('<OrganizationMap />', () => {

    it('Should match snapshot', () => {
        const organizationMap = mount(
            <OrganizationMap organization={mock} organizations={orgs_mock.organizations}   />
        );
        expect(organizationMap).toMatchSnapshot();
    });

    it('Should render map component', () => {
         const promise = Promise.resolve({});
         sinon.stub(axios, 'get').callsFake(() => promise)
         const organizationMap = mount(
            <OrganizationMap organization={mock} organizations={orgs_mock.organizations}   />
        );
        expect(organizationMap.find('.grommetux-map').length).toEqual(1);
        
    });
});