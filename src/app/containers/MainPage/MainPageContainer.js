import React from 'react';
import { connect } from 'react-redux';
import theme from '../../theme/global.scss';
import Section from 'grommet/components/Section';
import Heading from 'grommet/components/Heading';
import Split from 'grommet/components/Split';
import Box from 'grommet/components/Box';
import {OrganizationCardList, Loader, LatestCaseList, LatestEventList} from '../../components' 
import {fetchOrganizations} from '../../actions/organizationActions.js';
import {fetchLatest} from '../../actions/caseActions.js';
import {fetchLatestEvents} from '../../actions/eventActions.js';

@connect((store) => {
  return {
    organization: store.organization,
    case: store.case,
    event: store.event
  };
})

export default class MainPageContainer extends React.Component {
  constructor (props) {
    super(props);
  }

  componentDidMount = () => {
      fetchOrganizations();
      fetchLatest();
      fetchLatestEvents();
  }

  render () {
    return (
        <Section>
          <Split flex={"left"} showOnResponsive={"both"}>
            <Box pad='medium'>
              <Heading className={theme.sectionTitle} tag={"h3"} uppercase={true}>Suosituimmat organisaatiot</Heading>
              {this.props.organization.organizations ? <OrganizationCardList organizations={this.props.organization.organizations.results} /> : <Loader />}
            </Box>
            <Box pad='medium' >
              <Heading className={theme.sectionTitle} tag={"h3"} uppercase={true}>Viimeisimmät kokoukset</Heading>
              {this.props.event.latest_events && this.props.organization.organizations ? <LatestEventList latestEvents={this.props.event.latest_events.results} organizations={this.props.organization.organizations.results} /> : <Loader />}
              <Heading style={{marginTop: "20px"}} className={theme.sectionTitle} tag={"h3"} uppercase={true}>Viimeisimmät Asiat</Heading>
              {this.props.case.latest_cases ? <LatestCaseList latestCases={this.props.case.latest_cases.results} /> : <Loader />}
            </Box>
          </Split>
        </Section>
    );
  }
}