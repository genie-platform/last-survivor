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

export const fetchCurrentRound = (number) =>
  window.fetch(window.CONFIG.api.baseUrl + '/rounds/current/state', {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${loadState('state.user').jwtToken}`
    }
  }).then(response => response.json())
