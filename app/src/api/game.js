/* eslint quote-props: ["error", "consistent"] */

import { loadState } from '../utils/storage'

export const makeGuess = (number) =>
  window.fetch(window.CONFIG.api.baseUrl + '/rounds/act', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${loadState('state.user').jwtToken}`
    },
    body: JSON.stringify({
      guess: number
    })
  }).then(response => response.json())

export const fetchCurrentRound = ({ jwtToken }) =>
  window.fetch(window.CONFIG.api.baseUrl + '/rounds/current', {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${jwtToken}`
    }
  }).then(response => response.json())

export const fetchLastUserState = () =>
  window.fetch(window.CONFIG.api.baseUrl + '/states/last', {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${loadState('state.user').jwtToken}`
    }
  }).then(response => response.json())

export const fetchMyRounds = ({ jwtToken }) =>
  window.fetch(window.CONFIG.api.baseUrl + '/rounds', {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${jwtToken}`
    }
  }).then(response => response.json())

export const fetchMyWins = ({ jwtToken }) =>
  window.fetch(window.CONFIG.api.baseUrl + '/rounds/wins', {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${jwtToken}`
    }
  }).then(response => response.json())

export const claim = () =>
  window.fetch(window.CONFIG.api.baseUrl + '/rounds/wins', {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${loadState('state.user').jwtToken}`
    }
  }).then(response => response.json())
