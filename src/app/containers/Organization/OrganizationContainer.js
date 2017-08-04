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
import Heading from 'grommet/components/Heading';
import {OrganizationMap, Loader} from 'Components'
import {fetchOrganization, fetchOrganizations} from 'Actions';

@connect((store) => {
  return {
    organization: store.organization
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
        offset: 0,
        selectedOrganization: null
    }
    self = this;
  }

  componentDidMount = () => {
    const organization_id = this.props.params.id;
    this.setState({fetchStarted: false}, function() {
        fetchOrganizations();
        fetchOrganization(organization_id)
    });
  }

  componentDidUpdate = () => {
      if(this.props.organization.selected_organization && !this.state.fetchStarted) {
        this.setState({fetchStarted: true,},function() {
            if(this.props.organization.selected_organization.events.length > 0) {
                this.fetchEvents(this.props.organization.selected_organization);
            }
            if(this.props.organization.selected_organization.posts.length > 0) {
                this.fetchOrganizationPosts(this.props.organization.selected_organization);
            }
        });
      }

  }

  onAccordionChange = (e) => {
    this.fetchActions(e);
  }

 onPostAccordionChange = (e) => {
    this.fetchPostActions(e);
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
  gatherPosts = () => {
      let postListing = [];
      if(this.state.posts) {
          this.state.posts.map(function(post) {
            let actionList = [];
            post.actionList.sort((a,b) => a.ordering - b.ordering)
                            .map(function(action) {
                action.contents.map(function(para) {
                    actionList.push(<Section key={para.origin_id + "_PostArticle"}>
                                        <Heading tag={"h5"} 
                                                 uppercase={true}>{action.title}
                                        </Heading>
                                        {action.fetchedCase ? <Article>({action.fetchedCase.register_id}) {action.fetchedCase.title} </Article> : "" }
                                        {action.fetchedPost ? <Article><Label>Lausunnonantaja: {action.fetchedPost.label}</Label></Article> : "" }
                                            <Article><div dangerouslySetInnerHTML={{__html: para.hypertext}}></div></Article>
                                        </Section>);
                })
            });
            postListing.push(<AccordionPanel 
                                    key={post.id + "_postValue"} 
                                    heading={<Label>{post.label}</Label>}>
                                    {actionList}
                              </AccordionPanel>);
        });
      }
      return postListing;
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
      if(typeof(index) != 'undefined') {
        const event = this.state.events[index];
        event.actions.map(function(action) {
                axios.get(action)
                    .then(function(actionResponse) {
                        let existingEvents = self.state.events;
                        existingEvents[index].actionList.push(actionResponse.data); 
                        self.setState({events: existingEvents},function() { 
                            if(actionResponse.data.post)
                            {
                                this.fetchActionPosts(actionResponse.data.post, actionResponse.data.id, index)
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
  
  fetchPostActions = (index) => {
      if(typeof(index) != 'undefined') {
          console.log("inside")
        const post = this.state.posts[index];
        
        post.actions.map(function(action) {
                axios.get(action)
                    .then(function(actionResponse) {
                        let existingPosts = self.state.posts;
                        existingPosts[index].actionList.push(actionResponse.data); 
                        self.setState({posts: existingPosts});
                    });
        })
    }
  }

  fetchOrganizationPosts = (organization) => {
      organization.posts.map((post,index) => {
        axios.get(post)
             .then(function(postResponse) {
                let postList = self.state.posts || [];
                let currentPost = postResponse.data;
                currentPost.actionList = [];
                postList.push(currentPost);
                self.setState({posts: postList});
             });
      });
  }

  fetchActionPosts = (actionPost, action_id, eventIndex) => {
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
    const posts = this.gatherPosts();

    return (
        <Section>
            {this.props.organization.selected_organization && this.props.organization.organizations ? 
            <div>
            <Heading tag={"h3"} uppercase={true} className={theme.sectionTitle}>{this.props.organization.selected_organization.name}</Heading>
            <Heading tag={"h4"} uppercase={true}>Kokoukset</Heading>
            {events && events.length > 0 ? <Accordion onActive={this.onAccordionChange}>
                {events}
            </Accordion> : <Label>Ei kokouksia</Label>}
            {this.props.organization.selected_organization.events && this.state.events && this.props.organization.selected_organization.events.length != this.state.events.length ? <Anchor onClick={this.fetchMore}>Hae Lisää</Anchor> : "" }
            <Heading tag={"h4"} uppercase={true}>Lausunnot, Määräykset ja kannanotot</Heading>
             {posts && posts.length > 0 ? <Accordion onActive={this.onPostAccordionChange}>
                {posts}
            </Accordion> : <Label>Ei lausuntoja, määräyksiä tai kannanottoja</Label>}
            <Heading tag={"h4"} uppercase={true}>Organisaatiokaavio</Heading>
            {this.props.organization.organizations && this.props.organization.selected_organization ? 
                <OrganizationMap organization={this.props.organization.selected_organization} organizations={this.props.organization.organizations.results} /> 
            : null}
            </div>
            : <Loader /> }
        </Section>
    );
  }
}