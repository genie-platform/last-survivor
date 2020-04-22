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
import ProfilePage from './pages/Profile/Profile'
import IntroPage from './pages/Intro/Intro'
import Layout from './components/Layout/Layout'
import withTracker from './components/withTracker'

import { fetchMyWins, fetchMyRounds, fetchCurrentRound } from './api/game'
import { fetchProfile, updateAccountAddress } from './api/users'
import { saveState, loadState } from './utils/storage'

const history = createBrowserHistory()

const LoginPageWithTracker = withTracker(LoginPage)
const ProfilePageWithTracker = withTracker(ProfilePage)
const IntroPageWithTracker = withTracker(IntroPage)

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

  handleStartOver = async () => {
    return this.fetchCurrentRound()
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
            <AppPage user={this.state.user} currentRound={this.state.currentRound} onIntroDone={this.handleIntroDone} onStartOver={this.handleStartOver} />
          </Route>
          <Route path='/login'>
            <LoginPageWithTracker onLoginSuccess={this.handleLoginSuccess} currentRound={this.state.currentRound} />
          </Route>
          <Route path='/profile'>
            <ProfilePageWithTracker userStates={this.state.myRounds} profile={this.state.profile} updateAccountAddress={this.updateAccountAddress} />
          </Route>
          <Route path='/intro'>
            <IntroPageWithTracker onIntroDone={this.handleIntroDone} />
          </Route>
          <Redirect from='/' to='/app' />
        </Switch>
      </Router>
    </Layout>
  )
}
