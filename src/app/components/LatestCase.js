import React from 'react';
import PropTypes from 'prop-types';
import Card from 'grommet/components/Card';
import Label from 'grommet/components/Label';
export default class LatestCase extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
        action: null
    };
  }

  componentDidMount = () => {
  }

  render () {
    return (
        <div>
            <Card contentPad={"medium"}
                  style={{borderBottom: '2px solid #CCC'}}
                  label={this.props.register_id}
                  heading={this.props.subject}
                  description={<Label>{this.props.title}</Label>}/>
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
    ç: PropTypes.string
};
