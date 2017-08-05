import React from 'react';
import OrganizationCardList from './OrganizationCardList';
import mock from '../../../mock/Organizations.json';

describe('<OrganizationCardList />', () => {

    it('Should match snapshot', () => {
        const organizationCardList = mount(
            <OrganizationCardList organizations={mock.organizations}  />
        );
        expect(OrganizationCardList).toMatchSnapshot();
    });

    it('Should render correct elements', () => {
         const organizationCardList = mount(
            <OrganizationCardList organizations={mock.organizations}  />
        );
        expect(organizationCardList.find('OrganizationCard').length).toEqual(10);
    });
});