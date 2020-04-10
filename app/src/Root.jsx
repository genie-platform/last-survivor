import React, { Component } from 'react'
import {
  Redirect,
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
import { createBrowserHistory } from 'history'

import LoginPage from './pages/Login/Login'
import AppPage from './pages/App'
import SailsPage from './pages/Sails/Sails'
import ProfilePage from './pages/Profile/Profile'
import IntroPage from './pages/Intro/Intro'
import Layout from './components/Layout/Layout'
import { fetchMyWins, fetchMyRounds, fetchCurrentRound } from './api/game'

import { fetchProfile, updateAccountAddress } from './api/users'

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

export default class Root extends Component {
  constructor (props) {
    super(props)
    const user = loadState('state.user') || {
      isAuthenticated: false,
      jwtToken: undefined,
      isIntroDone: false
    }
    this.state = {
      user: user,
      profile: undefined,
      currentRound: undefined,
      rewards: [],
      myRounds: []
    }
  }

  handleLoginSuccess = (jwtToken) => {
    this.setState({ user: { ...this.state.user, jwtToken, isAuthenticated: true } })
    saveState('state.user', { ...this.state.user, jwtToken, isAuthenticated: true })
  }

  handleIntroDone = (isIntroDone, { persistent } = { persistent: true }) => {
    this.setState({ user: { ...this.state.user, isIntroDone } })
    if (persistent) {
      saveState('state.user', { ...this.state.user, isIntroDone })
    }
  }

  handleRewardsFetched = (rewards) => {
    this.setState({ rewards })
  }

  updateAccountAddress = async (accountAddress) => {
    const profile = await updateAccountAddress(accountAddress)
    this.setState({ profile })
  }

  async componentDidUpdate (prevProps, prevState) {
    if (this.state.user.isAuthenticated && !prevState.user.isAuthenticated) {
      this.fetchMyWins()
      this.fetchProfile()
      this.fetchMyRounds()
    }
  }

  async componentDidMount () {
    if (this.state.user.isAuthenticated) {
      this.fetchMyWins()
      this.fetchProfile()
      this.fetchMyRounds()
    }
    this.fetchCurrentRound()
  }

  async fetchMyWins () {
    const { data } = await fetchMyWins(this.state.user)
    if (data) {
      this.setState({ rewards: data })
    }
  }

  async fetchMyRounds () {
    const { data } = await fetchMyRounds(this.state.user)
    if (data) {
      this.setState({ myRounds: data })
    }
  }

  async fetchProfile () {
    const { data } = await fetchProfile(this.state.user)
    if (data) {
      this.setState({ profile: data })
    }
  }

  async fetchCurrentRound () {
    const { data } = await fetchCurrentRound(this.state.user)
    if (data) {
      this.setState({ currentRound: data })
    }
    return data
  }

  render = () => (
    <Layout>
      <Router history={history}>
        <Switch>
          <Route path='/app'>
            <AppPage user={this.state.user} currentRound={this.state.currentRound} onIntroDone={this.handleIntroDone} />
          </Route>
          <Route path='/login'>
            <LoginPage onLoginSuccess={this.handleLoginSuccess} currentRound={this.state.currentRound} />
          </Route>
          <Route path='/sails'>
            <SailsPage userStates={this.state.myRounds} />
          </Route>
          <Route path='/profile'>
            <ProfilePage userStates={this.state.myRounds} profile={this.state.profile} updateAccountAddress={this.updateAccountAddress} />
          </Route>
          <Route path='/intro'>
            <IntroPage onIntroDone={this.handleIntroDone} />
          </Route>
          <Redirect from='/' to='/app' />
        </Switch>
      </Router>
    </Layout>
  )
}
