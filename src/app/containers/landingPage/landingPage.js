import React from 'react';
import { connect } from 'react-redux';
import theme from './landingPage.scss';
import Hero from 'grommet/components/Hero';
import App from 'grommet/components/App';
import Image from 'grommet/components/Image';
import Card from 'grommet/components/Card';
import Anchor from 'grommet/components/Anchor';
import Box from 'grommet/components/Box';
import Linkicon from 'grommet/components/icons/base/LinkNext';
import Section from 'grommet/components/Section';

export default class LandingPage extends React.Component {
  constructor (props) {
    super(props);
  }

  render () {
    return (
      <App centered={false}>
        <p>Testi</p>
      </App>
    );
  }
}