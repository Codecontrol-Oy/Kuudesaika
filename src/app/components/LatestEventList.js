import React from 'react';
import PropTypes from 'prop-types';
import LatestEvent from './LatestEvent.js';
export default class LatestEventList extends React.Component {
  constructor (props) {
    super(props);
    self = this;
  }

  getOrganizationName = (id) => {
      for (let i = 0; i < this.props.organizations.length; i++) {
        if (this.props.organizations[i].id === id) {
            return this.props.organizations[i].name;
        }
      }
  }

    getOrganization = (id) => {
      for (let i = 0; i < self.props.organizations.length; i++) {
        if (self.props.organizations[i].id.toString() === id) {
            return self.props.organizations[i];
        }
      }
  }

  render () {
    let latest_events = [];
    if (this.props.latestEvents) {
        this.props.latestEvents.sort((a, b) => b.origin_id - a.origin_id).map(function (event) {
            const splitArray = event.organization.split('/');
            const organization_id = splitArray[splitArray.length - 2];
            const organization = self.getOrganization(organization_id);
            latest_events.push(<LatestEvent key={event.id + '_latest_event'} organization={organization} start_date={event.start_date} id={event.id} />);
        });
    }
    return (
        <div>
            {latest_events}
        </div>
    );
  }
}

LatestEventList.propTypes = {
    latestEvents: PropTypes.array,
    organizations: PropTypes.array
};
