import React from 'react';
import OrganizationCard from './OrganizationCard';
import mock from '../../../mock/Organization.json';
import sinon from 'sinon';
import { browserHistory } from 'react-router';
jest.mock('react-router', ()=>({browserHistory: {push: jest.fn()}}))

describe('<OrganizationCard />', () => {

    it('should match snapshot', () => {
        const organizationCard = shallow(<OrganizationCard name={mock.name}
                                                           id={mock.id}
                                                           events={mock.events}
                                                           posts={mock.posts}
                                                           created_at={mock.created_at}
                                                           modified_at={mock.modified_at}
                                                           classification={mock.classification}
                                                           data_source={mock.data_source}/>);
        expect(organizationCard).toMatchSnapshot();
    });

    it('Should contain correct elements and properties', () => {
        const organizationCard = mount(<OrganizationCard name={mock.name}
                                                           id={mock.id}
                                                           events={mock.events}
                                                           posts={mock.posts}
                                                           created_at={mock.created_at}
                                                           modified_at={mock.modified_at}
                                                           classification={mock.classification}
                                                           data_source={mock.data_source}/>);

        expect(organizationCard.find('Card').length).toEqual(1); 
        const card = organizationCard.find('Card');
        expect(card.prop('label')).toEqual(mock.data_source + " - " + mock.classification);
        expect(card.prop('heading')).toEqual(mock.name);
    });

    it('Should redirect after link click', () => {
        const organizationCard = mount(<OrganizationCard name={mock.name}
                                                           id={mock.id}
                                                           events={mock.events}
                                                           posts={mock.posts}
                                                           created_at={mock.created_at}
                                                           modified_at={mock.modified_at}
                                                           classification={mock.classification}
                                                           data_source={mock.data_source}/>);  
        
        const callback = sinon.spy(organizationCard.instance(),'onLinkClick');
        expect(organizationCard.find('a').length).toEqual(1);
        organizationCard.simulate('click');
        expect(callback.calledOnce).toEqual(true);
        expect(browserHistory.push).toHaveBeenCalled(); 
        expect(callback.firstCall.args[0]).toEqual(mock.id)
    })
});
