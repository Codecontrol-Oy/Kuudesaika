import React from 'react';
import { connect } from 'react-redux';
import theme from '../../theme/global.scss';
import axios from 'axios';
import Section from 'grommet/components/Section';
import Timestamp from 'grommet/components/Timestamp';
import Accordion from 'grommet/components/Accordion';
import AccordionPanel from 'grommet/components/AccordionPanel';
import Paragraph from 'grommet/components/Paragraph';
import Heading from 'grommet/components/Heading';
import Split from 'grommet/components/Split';
import Box from 'grommet/components/Box';
import {fetchOrganization} from '../../actions/organizationActions.js';
import {Loader} from '../../components' 
@connect((store) => {
  return {
    organization: store.organization,
  };
})

export default class OrganizationContainer extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
        events: null,
        posts: null,
        renderObjects: null,
        fetchStarted: false
    }
    self = this;
  }

  componentDidMount = () => {
    const organization_id = this.props.params.id;
    fetchOrganization(organization_id);
  }

  componentDidUpdate = () => {
      if(this.props.organization.selected_organization && !this.state.fetchStarted) {
        this.setState({fetchStarted: true},this.fetchEvents(this.props.organization.selected_organization));
      }

  }

  gatherEvents = () => {
      let eventListing = [];
      if(this.state.events) {
        this.state.events.map(function(event) {
            console.log(event.actionList.length);
            let actionList = [];
            event.actionList.map(function(action) {
                action.contents.map(function(para) {
                    actionList.push(<div dangerouslySetInnerHTML={{__html: para.hypertext}}></div>);
                })
            });
            eventListing.push(<AccordionPanel 
                                    key={event.id + "_eventValue"} 
                                    heading={<Timestamp value={event.created_at} />}>
                                    {actionList}
                              </AccordionPanel>);
        });
      }
      return eventListing;
  }

  fetchEvents = (organization) => {
    organization.events.map(function(event,i) {
        axios.get(event)
             .then(function(eventResponse) {
                let eventList = self.state.events || [];
                let currentEvent = eventResponse.data;
                currentEvent.actionList = [];
                eventList.push(currentEvent);
                self.setState({events: eventList});
                currentEvent.actions.map(function(action) {
                    axios.get(action)
                         .then(function(actionResponse) {
                            let existingEvents = self.state.events;
                            existingEvents[i].actionList.push(actionResponse.data);
                            self.setState({events: existingEvents});
                         });
                });

             });
    });
  }

  render () {
    const events = this.gatherEvents();
    return (
        <Section>
            {this.props.organization.selected_organization ? 
            <div>
            <Heading tag={"h3"} uppercase={true} className={theme.sectionTitle}>{this.props.organization.selected_organization.name}</Heading>
            <h4>Kokoukset</h4>
            <Accordion>
                {events}
            </Accordion>
            <h4>Toimet</h4>
            </div>
            : <Loader /> }
        </Section>
    );
  }
}