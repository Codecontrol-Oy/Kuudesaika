import React from 'react';
import { connect } from 'react-redux';
import Card from 'grommet/components/Card';
import Image from 'grommet/components/Image';
import Anchor from 'grommet/components/Anchor';
import {browserHistory} from 'react-router';
import PropTypes from 'prop-types';
import {getCity} from 'Actions';

export default class OrganizationCard extends React.Component {
  constructor (props) {
    super(props);
  }

  onLinkClick = (id) => {
    browserHistory.push(getCity() + '/organisaatio/' + id);
  }

  render () {
    return (
        <Card flex={"grow"} 
              label={this.props.data_source + ' - ' + this.props.classification}
              heading={this.props.name}
              thumbnail={<Image alt={"temporary image"} src={'http://lorempixel.com/640/480/people?' + this.props.id} />}
              headingStrong
              link={<Anchor onClick={() => this.onLinkClick(this.props.id)} label={"siirry"} />}
        />
    );
  }
}

OrganizationCard.propTypes = {
  name: PropTypes.string,
  id: PropTypes.number,
  events: PropTypes.array,
  posts: PropTypes.array,
  created_at: PropTypes.string,
  modified_at: PropTypes.string,
  classification: PropTypes.string,
  data_source: PropTypes.string
};
