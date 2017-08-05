import React from 'react';
import OrganizationSearch from './OrganizationSearch';
import mock from '../../../mock/Organizations.json';
import Article from 'grommet/components/Article';

describe('<OrganizationSearch />', () => {

    it('Should match snapshot', () => {
        const organizationSearch = mount(
            <OrganizationSearch organizations={mock.organizations}  />
        );
        expect(organizationSearch).toMatchSnapshot();
    });

    it('Should render search results', () => {
         const organizationSearch = mount(
            <OrganizationSearch organizations={mock.organizations}  />
        );
        expect(organizationSearch.find('OrganizationSearchResult').length).toEqual(0);
        expect(organizationSearch.find('input').length).toEqual(1);
        const event = {
            "target" : {
                "value" : "valtuusto"
            }
        };
        organizationSearch.instance().onSearch(event);
        expect(organizationSearch.find('OrganizationSearchResult').length).not.toEqual(0);

    });

    it('Should render no search results', () => {
         const organizationSearch = mount(
            <OrganizationSearch organizations={mock.organizations}  />
        );
        expect(organizationSearch.find('OrganizationSearchResult').length).toEqual(0);
        expect(organizationSearch.find('input').length).toEqual(1);
        const event = {
            "target" : {
                "value" : "ABCDEFG"
            }
        };
        organizationSearch.instance().onSearch(event);
        expect(organizationSearch.find('OrganizationSearchResult').length).toEqual(0);
        expect(organizationSearch.find('article').length).toEqual(1);
    });
});