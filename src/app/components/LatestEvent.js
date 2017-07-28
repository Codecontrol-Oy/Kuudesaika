import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Card from 'grommet/components/Card';
import Label from 'grommet/components/Label';
import Anchor from 'grommet/components/Anchor';
import Timestamp from 'grommet/components/Timestamp';
import axios from 'axios';
export default class LatestEvent extends React.Component {
  constructor (props) {
    super(props);
  }

  render () {
    return (
        <div>
            <Card contentPad={"medium"} 
                  style={{borderBottom: "2px solid #CCC"}}
                  label={<Timestamp fields={"date"} value={this.props.start_date} />}
                  heading={this.props.organization}
                  link={<Anchor href={"#" + this.props.id} target={"_blank"} label={"siirry"} />} />
        </div>
    );
  }
}

LatestEvent.propTypes = {
    organization: PropTypes.string,
    start_date: PropTypes.string,
    id: PropTypes.number
};