import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Card from 'grommet/components/Card';
import Label from 'grommet/components/Label';
import Anchor from 'grommet/components/Anchor';
import Timestamp from 'grommet/components/Timestamp';
import axios from 'axios';
export default class LatestCase extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
        action: null
    }
  }

  componentDidMount = () => {
  }

  render () {
    if(this.state.action) {

    }
    return (
        <div>
            <Card contentPad={"medium"} 
                  style={{borderBottom: "2px solid #CCC"}}
                  label={<Timestamp value={this.props.created_at} fields={"date"}/>}
                  heading={this.props.subject}
                  description={<Label announce={true}>{this.props.title}</Label>}/>
        </div>
    );
  }
}

LatestCase.propTypes = {
    url: PropTypes.string,
    id: PropTypes.number,
    data_source: PropTypes.string,
    actions: PropTypes.array,
    geometries: PropTypes.array,
    created_at: PropTypes.string,
    modified_at: PropTypes.string,
    origin_id: PropTypes.string,
    title: PropTypes.string,
    register_id: PropTypes.string,
    function: PropTypes.string,
    attachments: PropTypes.array,
    subject: PropTypes.string
};