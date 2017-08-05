import React from 'react';
import {browserHistory} from 'react-router';
import PropTypes from 'prop-types';
import Card from 'grommet/components/Card';
import Anchor from 'grommet/components/Anchor';
import {getCity} from 'Actions';

export default class LatestEvent extends React.Component {
  constructor (props) {
    super(props);
  }

  onLinkAction = () => {
    browserHistory.push(getCity() + '/organisaatio/' + this.props.organization.id);
  }

  render () {
    return (
        <div>
            <Card contentPad={"medium"}
                  style={{borderBottom: '2px solid #CCC'}}
                  label={this.props.organization.data_source + '-' + this.props.organization.classification}
                  link={<Anchor onClick={() => this.onLinkAction()} >Siirry</Anchor>}
                  heading={this.props.organization.name} />
        </div>
    );
  }
}

LatestEvent.propTypes = {
    organization: PropTypes.object
};
