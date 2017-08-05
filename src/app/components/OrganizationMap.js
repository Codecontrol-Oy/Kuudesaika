import React from 'react';
import PropTypes from 'prop-types';
import Map from 'grommet/components/Map';
import Box from 'grommet/components/Box';
import Section from 'grommet/components/Box';
import {browserHistory} from 'react-router';
import {getCity} from 'Actions';

export default class OrganizationMap extends React.Component {
  constructor (props) {
    super(props);
        this.state = {
        selectedOrganization: null
    };
  }

  openOrganization = (id) => {
   if (id) {
        browserHistory.push( id);
        window.location.reload();
   }
  }

  selectOrganization = (index) => {
      if (this.state.selectedOrganization !== index) {
        this.setState({selectedOrganization: index });
      }
  }

  getParents = (organization) => {
      const results = [];
      this.findParent(organization.url, results);
      return results;
  }

  getChilds = (organization) => {
      const results = [];
      this.findChild(organization.id, results);
      return results;
  }

  findChild = (child, array) => {
    for (let i = 0; i < this.props.organizations.length; i++) {
        if (this.props.organizations[i].parent) {
            const parent = this.props.organizations[i].parent;
            const splitArray = parent.split('/');
            const parent_id = splitArray[splitArray.length - 2];
            if (parent_id === child.toString()) {
                array.push(this.props.organizations[i]);
                this.findChild(this.props.organizations[i].id, array);
            }
        }
    }
  }

  findParent = (parent, array) => {
   if (parent) {
    const splitArray = parent.split('/');
    const parent_id = splitArray[splitArray.length - 2];
    for (let i = 0; i < this.props.organizations.length; i++) {
            if (this.props.organizations[i].id.toString() === parent_id) {
                if (this.props.organizations[i].id !== this.props.organization.id) {
                    array.push(this.props.organizations[i]);
                }
                if (this.props.organizations[i].parent) {
                    this.findParent(this.props.organizations[i].parent, array);
                }
                break;
            }
    }
   }
  }

  gatherOrganizationMap = () => {
    const categories = [];
    const parents = this.getParents(this.props.organization);
    const childs = this.getChilds(this.props.organization);
    const links = [];

    let organizationList = [];
    organizationList = organizationList.concat(parents);
    organizationList.push(this.props.organization);
    organizationList = organizationList.concat(childs);

    for (let i = 0; i < organizationList.length; i++) {
        let found = false;
        for (let x = 0; x < categories.length; x++) {
            if (categories[x].label === organizationList[i].classification) {
                found = true;
            }
        }
        if (!found) {
         categories.push({
            'id': `category-${organizationList[i].id}`,
            'label': organizationList[i].classification,
            'items': []
         });
        }

    }


    for (let i = 0; i < organizationList.length; i++) {
      for (let n = 0; n < categories.length; n++) {
        if (categories[n].label === organizationList[i].classification) {
            if (organizationList[i].id === this.props.organization.id) {
                categories[n].items.push({
                'id': organizationList[i].id.toString(),
                'label': organizationList[i].name,
                'node': <Box colorIndex='neutral-1' pad={"small"}>{organizationList[i].name}</Box>
                });
            } else {
                categories[n].items.push({
                'id': organizationList[i].id.toString(),
                'label': organizationList[i].name
                });
            }
            break;
        }
      }
    }

    for (let i = 0; i < organizationList.length; i++) {
      if (organizationList[i].parent) {
        const parent = organizationList[i].parent;
        const organization = organizationList[i];
        const splitArray = parent.split('/');
        const parent_id = splitArray[splitArray.length - 2];
        for (let n = 0; n < categories.length; n++) {
          for (let f = 0; f < categories[n].items.length; f++) {
            if (categories[n].items[f].id === parent_id) {
              links.push({'parentId': parent_id.toString(), 'childId': organization.id.toString()});
            }
          }
        }
      }
    }
    return <Map onClick={() => this.openOrganization(this.state.selectedOrganization)} onActive={this.selectOrganization} active={this.state.selectedOrganization} vertical={false} data={{'categories': categories, 'links': links}} />;

  }

  render () {
    const organizationMap = this.gatherOrganizationMap();
    return (
            <Section>
                {organizationMap}
            </Section>
    );
  }
}

OrganizationMap.propTypes = {
    organization: PropTypes.object,
    organizations: PropTypes.array
};
