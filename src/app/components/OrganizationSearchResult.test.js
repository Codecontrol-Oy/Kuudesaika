import React from 'react';
import OrganizationSearchResult from './OrganizationSearchResult';
import mock from '../../../mock/Organization.json';

describe('<OrganizationSearchResults />', () => {

    it('Should match snapshot', () => {
        const organizationSearchResult = mount(
            <OrganizationSearchResult organization={mock} onClick={() => {}}   />
        );
        expect(organizationSearchResult).toMatchSnapshot();
    });

    it('Should render components', () => {
         const organizationSearchResult = mount(
            <OrganizationSearchResult organization={mock} onClick={() => {}}   />
        );
        expect(organizationSearchResult.find('ListItem').length).toEqual(1);
        expect(organizationSearchResult.find('LatestEvent').length).toEqual(1);
    });
});