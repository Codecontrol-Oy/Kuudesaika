import React from 'react';
import { connect } from 'react-redux';
import theme from '../../theme/global.scss';
import axios from 'axios';
import Section from 'grommet/components/Section';
import Anchor from 'grommet/components/Section';
import Article from 'grommet/components/Article';
import Label from 'grommet/components/Label';
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
        fetchStarted: false,
        limit: 5,
        offset: 0
    }
    self = this;
  }

  componentDidMount = () => {
    const organization_id = this.props.params.id;
    fetchOrganization(organization_id);
  }

  componentDidUpdate = () => {
      if(this.props.organization.selected_organization && !this.state.fetchStarted) {
        this.setState({fetchStarted: true,},this.fetchEvents(this.props.organization.selected_organization));
      }

  }

  onAccordionChange = (e) => {
    this.fetchActions(e);
  }

  fetchMore = () => { 
    let offset = this.state.offset;
    offset = offset +5;
    console.log(offset + " temp value");
    this.setState({offset},this.fetchEvents(this.props.organization.selected_organization));
    
  }



  gatherEvents = () => {
      let eventListing = [];
      if(this.state.events) {
          this.state.events.sort((a,b) => b.origin_id - a.origin_id)
                            .map(function(event) {
            let actionList = [];
            event.actionList.sort((a,b) => a.ordering - b.ordering)
                            .map(function(action) {
                action.contents.map(function(para) {
                    actionList.push(<Section key={para.origin_id + "_Article"}>
                                        <Heading tag={"h5"} 
                                                 uppercase={true}>{action.title}
                                        </Heading>
                                        {action.fetchedCase ? <Article>({action.fetchedCase.register_id}) {action.fetchedCase.title} </Article> : "" }
                                        {action.fetchedPost ? <Article><Label>Lausunnonantaja: {action.fetchedPost.label}</Label></Article> : "" }
                                            <Article><div dangerouslySetInnerHTML={{__html: para.hypertext}}></div></Article>
                                        </Section>);
                })
            });
            eventListing.push(<AccordionPanel 
                                    key={event.id + "_eventValue"} 
                                    heading={<Label>Kokouspäivämäärä <Timestamp fields={"date"} value={event.start_date}/></Label>}>
                                    {actionList}
                              </AccordionPanel>);
        });
      }
      return eventListing;
  }

  fetchEvents = (organization) => {
    let offset = 0;
    if(this.state.events) { 
        offset = this.state.offset + 5;
    }
    for(var i = organization.events.length - offset ; i > (organization.events.length - this.state.limit - offset); i--) {
        axios.get(organization.events[i -1])
             .then(function(eventResponse) {
                let eventList = self.state.events || [];
                let currentEvent = eventResponse.data;
                currentEvent.actionList = [];
                eventList.push(currentEvent);
                self.setState({events: eventList});
             });
    }
    
  }
 
  fetchActions = (index) => {
      console.log(index);
      if(typeof(index) != 'undefined') {
        const event = this.state.events[index];
        console.log(JSON.stringify("event_id: " + event.id));
        event.actions.map(function(action) {
                axios.get(action)
                    .then(function(actionResponse) {
                        console.log("Actions event: " + actionResponse.data.event)
                        let existingEvents = self.state.events;
                        existingEvents[index].actionList.push(actionResponse.data); 
                        self.setState({events: existingEvents},function() { 
                            if(actionResponse.data.post)
                            {
                                this.fetchPost(actionResponse.data.post, actionResponse.data.id, index)
                            }
                            if(actionResponse.data.case)
                            {
                                this.fetchCase(actionResponse.data.case, actionResponse.data.id, index)
                            }
                        });
                    });
        })
    }
  }

  fetchPost = (actionPost, action_id, eventIndex) => {
    axios.get(actionPost)
         .then(function(postResponse) {
             const events = self.state.events;
             for(let i = 0; i < events[eventIndex].actionList.length -1; i++) {
                 if(events[eventIndex].actionList[i].id == action_id) {
                     events[eventIndex].actionList[i].fetchedPost = postResponse.data;
                 }
             }
             self.setState({events: events});
         });
  }

  fetchCase = (actionCase, action_id, eventIndex) => {
      console.log(actionCase + " Case url")
    axios.get(actionCase)
         .then(function(caseResponse) {
            const events = self.state.events;
             for(let i = 0; i < events[eventIndex].actionList.length -1; i++) {
                 if(events[eventIndex].actionList[i].id == action_id) {
                     events[eventIndex].actionList[i].fetchedCase = caseResponse.data;
                 }
             }
             self.setState({events: events});
         });
  }


  render () {
    const events = this.gatherEvents();
    return (
        <Section>
            {this.props.organization.selected_organization ? 
            <div>
            <Heading tag={"h3"} uppercase={true} className={theme.sectionTitle}>{this.props.organization.selected_organization.name}</Heading>
            <Heading tag={"h4"} uppercase={true}>Kokoukset</Heading>
            <Accordion onActive={this.onAccordionChange}>
                {events}
            </Accordion>
            {this.props.organization.selected_organization.events && this.state.events && this.props.organization.selected_organization.events.length != this.state.events.length ? <Anchor onClick={this.fetchMore}>Hae Lisää</Anchor> : "" }
            <Heading tag={"h4"} uppercase={true}>Toimet</Heading>
            </div>
            : <Loader /> }
        </Section>
    );
  }
}