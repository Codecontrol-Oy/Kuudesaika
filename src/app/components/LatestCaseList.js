import React from 'react';
import LatestCase from './LatestCase.js';
import PropTypes from 'prop-types';
import axios from 'axios';
export default class LatestCaseList extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
        latest_cases: []
    };
    self = this;
  }

  componentDidMount = () => {
      this.onFetchFunctions();
  }

  onFetchFunctions = () => {
    if (this.props.latestCases) {
        this.props.latestCases.map(function (obj) {
            axios.get(obj.function)
                 .then(function (response) {
                    const cases = self.state.latest_cases || [];
                    cases.push(<LatestCase url={obj.url}
                                          id={obj.id}
                                          data_source={obj.data_source}
                                          actions={obj.actions}
                                          geometries={obj.geometries}
                                          created_at={obj.created_at}
                                          modified_at={obj.modified_at}
                                          origin_id={obj.origin_id}
                                          title={obj.title}
                                          register_id={obj.register_id}
                                          function={obj.function}
                                          attachments={obj.attachments}
                                          subject={response.data.name}
                                          key={obj.id + '_latestcase'}
                    />);
                    self.setState({latest_cases: cases});
                 });

        });
    }
  }

  render () {
    return (
        <div>
            {this.props.latestCases && this.state.latest_cases}
        </div>
    );
  }
}

LatestCaseList.propTypes = {
    latestCases: PropTypes.array
};
