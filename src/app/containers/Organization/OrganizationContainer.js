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
import {fetchOrganization, fetchOrganizations} from '../../actions/organizationActions.js';
import {Loader} from '../../components' 
import Map from 'grommet/components/Map';
import {browserHistory} from 'react-router';

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

  findChild = (child, array) => {
    for(let i = 0; i < this.props.organization.organizations.results.length; i++) {
        if(this.props.organization.organizations.results[i].parent) {
            const parent = this.props.organization.organizations.results[i].parent;
            const splitArray = parent.split("/");
            const parent_id = splitArray[splitArray.length - 2];
            if(parent_id  == child.toString()) 
            {
                array.push(this.props.organization.organizations.results[i]);
                this.findChild(this.props.organization.organizations.results[i].id,array);
            }
        }
    }
  }

  findParent = (parent, array) => {
   if(parent) {
    const splitArray = parent.split("/");
    const parent_id = splitArray[splitArray.length - 2];
    for(let i = 0; i < this.props.organization.organizations.results.length; i++) {
            if(this.props.organization.organizations.results[i].id.toString() == parent_id) {
                if(this.props.organization.organizations.results[i].id != this.props.organization.selected_organization.id) {
                    array.push(this.props.organization.organizations.results[i]);
                }
                if(this.props.organization.organizations.results[i].parent) {
                    this.findParent( this.props.organization.organizations.results[i].parent,array);
                }
                break;
            }
    }
   }
  }

  openOrganization = (id) => {
   if(id) {
        browserHistory.push("/organisaatio/" + id);
        window.location.reload()
   }
  }

  selectOrganization = (index) => {
      if(this.state.selectedOrganization != index) {
        this.setState({selectedOrganization: index });
      }
  }

  getParents = (organization) => {
      let results = [];
      this.findParent(organization.url, results);
      return results;
  }

  getChilds = (organization) => {
      let results = []
      this.findChild(organization.id, results)
      return results;
  }
    

  gatherOrganizationMap = () => {
    let categories = [];
    let parents = this.getParents(this.props.organization.selected_organization);
    let childs = this.getChilds(this.props.organization.selected_organization);
    let links = [];

    let organizationList = [];
    organizationList = organizationList.concat(parents);
    organizationList.push(this.props.organization.selected_organization);
    organizationList = organizationList.concat(childs);

    for(let i = 0; i < organizationList.length; i++) {
        let found = false;
        for(let x = 0; x < categories.length; x++) {
            if(categories[x].label == organizationList[i].classification) {
                found = true;
            }
        }
        if(!found) {
         categories.push({
            "id": `category-${organizationList[i].id}`,
            "label": organizationList[i].classification,
            "items": []
         });          
        }

    }
    
        
    for(let i = 0; i < organizationList.length; i++) {
      for(let n = 0; n < categories.length; n++) {
        if(categories[n].label == organizationList[i].classification) {
            if(organizationList[i].id == this.props.organization.selected_organization.id) {
                categories[n].items.push({
                "id": organizationList[i].id.toString(),
                "label": organizationList[i].name,
                "node": <Box colorIndex='neutral-1' pad={"small"}>{organizationList[i].name}</Box>
                });
            } else {
                categories[n].items.push({
                "id": organizationList[i].id.toString(),
                "label": organizationList[i].name
                });
            }
            break;
        }
      }
    }

    for(let i = 0; i < organizationList.length; i++) {
      if(organizationList[i].parent) {
        const parent = organizationList[i].parent;
        const organization = organizationList[i];
        const splitArray = parent.split("/");
        const parent_id = splitArray[splitArray.length - 2];
        for(let n = 0; n < categories.length; n++) {
          for(let f = 0; f < categories[n].items.length; f++) {
            if(categories[n].items[f].id == parent_id) {
              links.push({"parentId" : parent_id.toString(), "childId" : organization.id.toString()})
            }
          }
        }
      }
    }
    return <Map onClick={() => this.openOrganization(this.state.selectedOrganization)} onActive={this.selectOrganization} active={this.state.selectedOrganization} vertical={false} data={{"categories" : categories, "links": links}} />;
  
  }

  render () {
    const events = this.gatherEvents();
    const posts = this.gatherPosts();
    const OrganizationMap = this.props.organization.selected_organization && this.props.organization.organizations ? this.gatherOrganizationMap() : null;
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
            {this.props.organization.organizations ? OrganizationMap : null}
            </div>
            : <Loader /> }
        </Section>
    );
  }
}