import React from 'react';
import PropTypes from 'prop-types';
import Map from 'grommet/components/Map';
import Card from 'grommet/components/Card';
import Box from 'grommet/components/Box';
import Section from 'grommet/components/Section';
import Article from 'grommet/components/Article';
import Heading from 'grommet/components/Heading';
import Anchor from 'grommet/components/Anchor';
import {browserHistory} from 'react-router';
import {getCity} from 'Actions';
import Timestamp from 'grommet/components/Timestamp';
import {ActionResolution} from 'Components';

export default class CaseMap extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
        selectedOrganization: null
    };
  }

  openOrganization = (id) => {
   if (id) {
        browserHistory.push(`/${getCity()}/organisaatio/` + id);
        window.location.reload();
   }
  }

  selectOrganization = (index) => {
      if (this.state.selectedOrganization !== index) {
        this.setState({selectedOrganization: index });
      }
  }



  gatherCaseMap = () => {
    const categories = [];
    const links = [];
    categories.push({
            'id': 'category-original',
            'label': 'Asia',
            'items': []
         });
    categories.push({
            'id': 'category-sections',
            'label': 'Käsittelypisteet',
            'items': []
         });
        categories[0].items.push({
                'id': 'selected-' + this.props.currentCase.id.toString(),
                'label': this.props.currentCase.register_id,
                'node': <Box colorIndex='neutral-1' pad={"small"}>{this.props.currentCase.register_id}</Box>
                });

    for (let i = 0; i < this.props.actions.length; i++) {

        const isEventBased = this.props.actions[i].event ? true : false;
        const organization = this.props.actions[i].event ? this.props.actions[i].event.organization : this.props.actions[i].post.organization;
        const startDate = isEventBased ? this.props.actions[i].event.start_date : this.props.actions[i].post.start_date;
        categories[1].items.push({
                'id': this.props.actions[i].id.toString(),
                'label': isEventBased ? this.props.actions[i].event.organization.name : this.props.actions[i].post.organization.name,
                'node': <Card colorIndex='neutral-4'
                              pad={"small"}
                              label={organization.classification}
                              heading={organization.name}
                              description={<Section>{startDate && <b><Timestamp fields={"date"} value={startDate}/></b>}<Article>{this.props.actions[i].title}</Article><Article><ActionResolution resolution={this.props.actions[i].resolution} /></Article></Section>}
                              link={<Anchor onClick={() => this.openOrganization(this.state.selectedOrganization)} label={"siirry organisaatioon"} />}
                              >
                        </Card>
                });
    }

    for(let i = 0; i < categories[1].items.length; i++) {
        links.push({'parentId': `selected-${this.props.currentCase.id.toString()}`, 'childId': categories[1].items[i].id.toString()})
    }
    return <Map onClick={() => this.openOrganization(this.state.selectedOrganization)} onActive={this.selectOrganization} active={this.state.selectedOrganization} vertical={false} data={{'categories': categories, 'links': links}} />;

  }

  render () {
    const caseMap = this.gatherCaseMap();
    return (
            <Section>
                {caseMap}
            </Section>
    );
  }
}

CaseMap.propTypes = {
    currentCase: PropTypes.object,
    actions: PropTypes.array
};

