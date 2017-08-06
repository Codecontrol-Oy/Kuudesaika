import React from 'react';
import PropTypes from 'prop-types';
import Anchor from 'grommet/components/Anchor';
import Paragraph from 'grommet/components/Paragraph';
import {getCity} from 'Actions';

export default class Breadcrumb extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
        action: null
    };
  }

  createCrumb = () => {

    const path = this.props.path.pathname;
    const pathArray = path.split('/');
    let crumb = null;
    if(pathArray.length > 1 && pathArray.length < 3) {
        crumb = <div><Anchor href={'/'}>Kaupunkivalinta</Anchor> - {getCity()}</div>
    } else if (pathArray.length < 4){
        crumb = <div><Anchor href={'/'}>Kaupunkivalinta</Anchor> - <Anchor href={'/' + getCity()}>{getCity()}</Anchor></div>
    } else {
        crumb = <div><Anchor href={'/'}>Kaupunkivalinta</Anchor> - <Anchor href={'/' + getCity()}>{getCity()}</Anchor> - {pathArray[2]}</div>
    }
    return crumb;
  }

  render () {
    const crumb = this.createCrumb();
    return (
        <Paragraph style={{marginLeft: "12px", marginTop: "0px", marginBottom: "0px"}}>
            {crumb}
        </Paragraph>
    );
  }
}

Breadcrumb.propTypes = {
    path: PropTypes.object,
};