import React from 'react';
import { connect } from 'react-redux';
import OrganizationCard from './OrganizationCard.js';
import Tiles from 'grommet/components/Tiles';
import PropTypes from 'prop-types';

export default class OrganizationCardList extends React.Component {
  constructor (props) {
    super(props);
  }


  render () {
    let organizations = [];
    
    if(this.props.organizations) {
        let orgs = this.props.organizations;
        orgs.sort((a, b) => b.events.length - a.events.length)
            .map(function(org, i) {
                if(i < 10) {
                 organizations.push(
                    <OrganizationCard name={org.name} 
                        classification={org.classification} 
                        id={org.id}
                        events={org.events}
                        posts={org.posts}
                        created_at={org.created_at}
                        modified_at={org.modified_at}
                        data_source={org.data_source}
                        key={org.id}
                    />);
                }
        });
    }
    return (
        <div>
            <Tiles>
                {this.props.organizations && organizations}
            </Tiles>
        </div>
    );
  }
}

OrganizationCardList.propTypes = {
    organizations: PropTypes.array
};