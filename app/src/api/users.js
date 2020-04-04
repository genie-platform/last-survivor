/* eslint quote-props: ["error", "consistent"] */

import { loadState } from '../utils/storage'

export const fetchProfile = () =>
  window.fetch(window.CONFIG.api.baseUrl + '/users', {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${loadState('state.user').jwtToken}`
    }
  }).then(response => response.json())

export const updateAccountAddress = (accountAddress) =>
  window.fetch(window.CONFIG.api.baseUrl + '/users', {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${loadState('state.user').jwtToken}`
    },
    body: JSON.stringify({
      accountAddress
    })
  }).then(response => response.json())
