import React from 'react';
import Section from 'grommet/components/Section';
import Search from 'grommet/components/Search';
import List from 'grommet/components/List';
import Article from 'grommet/components/Article';
import OrganizationSearchResult from './OrganizationSearchResult.js';
import PropTypes from 'prop-types';

export default class OrganizationSearch extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
        searchResults: null,
        searchStarted: false
    };
  }

  onSearch = (event) => {
    let Results = [];
    let searchStarted = false;
    if (event.target.value && event.target.value.length > 2) {
      searchStarted = true;
      for (let i = 0; i < this.props.organizations.length - 1; i++) {
          const resultsFound = this.props.organizations[i].name.toLowerCase().includes(event.target.value.toLowerCase());
          if (resultsFound) {
                  Results.push(<OrganizationSearchResult key={Results.length + 1} organization={this.props.organizations[i]} />);
          }
      }
    } else {
      searchStarted = false;
    }
    if (Results.length > 0) {
        this.setState({searchResults: <List>{Results}</List>, searchStarted});
    } else {
        this.setState({searchResults: null, searchStarted});
    }
  }
  render () {

    return (
            <Section>
                <Search onDOMChange={this.onSearch} placeHolder={"Hakusana"} responsive={false} inline size={"medium"} />
                {this.state.searchResults ? this.state.searchResults : this.state.searchStarted ? <Article>Ei tuloksia.</Article> : ''}
            </Section>

    );
  }
}

OrganizationSearch.propTypes = {
  organizations: PropTypes.array
};
