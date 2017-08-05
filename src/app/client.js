import 'babel-polyfill';
import 'react-toolbox/lib/commons.scss';
import React from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import { syncHistoryWithStore} from 'react-router-redux';
import App from './App.js';
import {MainPageContainer, PageNotFoundContainer, OrganizationContainer, CaseContainer} from './containers';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { Provider } from 'react-redux';
import store from './store';


// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

const history = syncHistoryWithStore(browserHistory, store)

render((
  <Provider store={store}>
    { /* Tell the Router to use our enhanced history */ }
    <Router history={history}>
            <Route path="/" component={App}>
                { /* Landing Page in root */ }
                <IndexRoute component={MainPageContainer} />
                <Route path="organisaatio/:id" component={OrganizationContainer} />
                <Route path="asia/:id" component={CaseContainer} />
                <Route path="*" component={PageNotFoundContainer} />
            </Route>

        </Router>
  </Provider>
), document.getElementById('app'));
