import React from 'react';
import ListItem from 'grommet/components/ListItem';
import LatestEvent from './LatestEvent.js';
import PropTypes from 'prop-types';

export default class OrganizationSearchResult extends React.Component {
  constructor (props) {
    super(props);
    }

  render () {

    return (
            <ListItem>
                <LatestEvent organization={this.props.organization} />
            </ListItem>
    );
  }
}

OrganizationSearchResult.propTypes = {
  onClick: PropTypes.func,
  organization: PropTypes.object
};