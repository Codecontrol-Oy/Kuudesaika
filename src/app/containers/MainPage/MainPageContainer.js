import React from 'react';
import { connect } from 'react-redux';
import theme from '../../theme/global.scss';
import Section from 'grommet/components/Section';
import Heading from 'grommet/components/Heading';
import Split from 'grommet/components/Split';
import Box from 'grommet/components/Box';
import {OrganizationCardList, Loader, LatestCaseList, LatestEventList, OrganizationSearch} from 'Components';
import {fetchLatest, fetchLatestEvents, fetchOrganizations, setCity} from 'Actions';

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
      setCity(this.props.params.city);
      fetchOrganizations();
      fetchLatest();
      fetchLatestEvents();
  }

  render () {
    return (
        <Section>
          <Split flex={"left"} showOnResponsive={"both"}>
            <Box pad="small">
              <Heading className={theme.sectionTitle} tag={"h3"} uppercase>Suosituimmat organisaatiot</Heading>
              {this.props.organization.organizations ? <OrganizationCardList organizations={this.props.organization.organizations.results} /> : <Loader />}
            </Box>
            <Box pad="small">
              <Heading className={theme.sectionTitle} tag={"h3"} uppercase>Organisaatiohaku</Heading>
              {this.props.organization.organizations ? <OrganizationSearch organizations={this.props.organization.organizations.results} /> : <Loader />}
              <Heading className={theme.sectionTitle} tag={"h3"} uppercase>Viimeisimmät kokoukset</Heading>
              {this.props.event.latest_events && this.props.organization.organizations ? <LatestEventList latestEvents={this.props.event.latest_events.results} organizations={this.props.organization.organizations.results} /> : <Loader />}
              <Heading style={{marginTop: '20px'}} className={theme.sectionTitle} tag={"h3"} uppercase>Viimeisimmät Asiat</Heading>
              {this.props.case.latest_cases ? <LatestCaseList latestCases={this.props.case.latest_cases.results} /> : <Loader />}
            </Box>
          </Split>
        </Section>
    );
  }
}
