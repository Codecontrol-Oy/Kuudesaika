import React, {Component} from 'react';
import mainCss from './app.scss';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import localization from './localization/index.js';
import { connect } from 'react-redux';
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

  componentWillMount = () => {
  
  }

  componentDidUpdate = () => {
  
  }

  render () {
    return (
      <MuiThemeProvider>
          <Application centered={false}>
            <Header size={"large"} className={theme.header}>
              <Anchor className={theme.headerTitle} href={"https://6aika.fi/kaupungit/helsinki/"} target={"_blank"}>#6Aika</Anchor>
              <Heading align={"center"} strong={true} tag={"h1"} uppercase={true}>Decisions API React Client</Heading>
            </Header>
            <Section className={theme.app}>
              {this.props.children}
            </Section>
            <Footer size={"large"}  className={theme.footer}>
              <p>Footer</p>
            </Footer>
          </Application>
      </MuiThemeProvider>
    );
  }
}