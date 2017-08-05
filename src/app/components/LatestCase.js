import React from 'react';
import PropTypes from 'prop-types';
import Card from 'grommet/components/Card';
import Label from 'grommet/components/Label';
import Anchor from 'grommet/components/Anchor';
import {browserHistory} from 'react-router';
import {getCity} from 'Actions';

export default class LatestCase extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
        action: null
    };
  }

onLinkAction = () => {
    browserHistory.push(`/${getCity()}/asia/` + this.props.id);
  }

  render () {
    return (
        <div>
            <Card contentPad={"medium"}
                  style={{borderBottom: '2px solid #CCC'}}
                  label={this.props.register_id}
                  heading={this.props.subject}
                  description={<Label announce>{this.props.title}</Label>}
                  link={<Anchor onClick={() => this.onLinkAction()} >Siirry</Anchor>}
                  />
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
