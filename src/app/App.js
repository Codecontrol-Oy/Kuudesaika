import React, {Component} from 'react';
import mainCss from './app.scss';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import localization from './localization/index.js';
import { connect } from 'react-redux';


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
      <div>
          {this.props.children}
      </div>
      </MuiThemeProvider>
    );
  }
}