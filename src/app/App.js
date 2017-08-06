import React, {Component} from 'react';
import theme from './theme/global.scss';
import Application from 'grommet/components/App';
import Header from 'grommet/components/Header';
import Section from 'grommet/components/Section';
import Anchor from 'grommet/components/Anchor';
import Heading from 'grommet/components/Heading';
import Footer from 'grommet/components/Footer';

export default class App extends Component {
  constructor (props) {
    super(props);
  }

  render () {
    return (
      <Application centered={false}>
        <Header size={"large"} className={theme.header}>
          <Anchor className={theme.headerTitle} href={"https://6aika.fi/kaupungit"} target={"_blank"}>#6Aika</Anchor>
          <Heading align={"center"} strong tag={"h1"} uppercase>Decisions API React Client</Heading>
        </Header>
        <Section className={theme.app}>
          {this.props.children}
        </Section>
        <Footer size={"large"} className={theme.footer}>
        </Footer>
      </Application>
    );
  }
}