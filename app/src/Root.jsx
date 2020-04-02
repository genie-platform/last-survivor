import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useHistory
} from 'react-router-dom'
import { createBrowserHistory } from 'history'

import LoginPage from './pages/Login'
import AppPage from './pages/App'

import { saveState, loadState } from './utils/storage'

const history = createBrowserHistory()

window.CONFIG = {
  api: {
    auth: {
      google: {
        clientId: '258894479393-0msb45loib4653r6kq2bc21kdiq0jbr4.apps.googleusercontent.com'
      }
    },
    baseUrl: 'http://localhost:3002/api/v1'
  }
}

// This example has 3 pages: a public page, a protected
// page, and a login screen. In order to see the protected
// page, you must first login. Pretty standard stuff.
//
// First, visit the public page. Then, visit the protected
// page. You're not yet logged in, so you are redirected
// to the login page. After you login, you are redirected
// back to the protected page.
//
// Notice the URL change each time. If you click the back
// button at this point, would you expect to go back to the
// login page? No! You're already logged in. Try it out,
// and you'll see you go back to the page you visited
// just *before* logging in, the public page.

// export default class Root extends Component {

export default class Root extends Component {
  constructor (props) {
    super(props)
    const user = loadState('state.user') || {
      isAuthenticated: false,
      jwtToken: undefined,
      isIntroDone: false
    }
    this.state = {
      user: user
    }
  }

  handleLoginSuccess = (jwtToken) => {
    this.setState({ user: { ...this.state.user, jwtToken, isAuthenticated: true } })
    saveState('state.user', { ...this.state.user, jwtToken, isAuthenticated: true })
  }

  handleIntroDone = (isIntroDone) => {
    this.setState({ user: { ...this.state.user, isIntroDone } })
    saveState('state.user', { ...this.state.user, isIntroDone })
  }

  // componentDidMount () {
  //   const user = loadState('state.user')
  //   if (user) {
  //     this.setState({ user: user })
  //   }
  // }

  // componentDidUpdate () {
  //   console.log(state.user.isAuthenticated)
  // }

  render = () => (
    <Router history={history}>
      <Switch>
        <Route exact path='/'>
          <AppPage user={this.state.user} onIntroDone={this.handleIntroDone} />
        </Route>
        <Route path='/login'>
          <LoginPage onLoginSuccess={this.handleLoginSuccess} />
        </Route>
      </Switch>
    </Router>
  );
}
