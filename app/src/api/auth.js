
// const { baseUrl } = window.CONFIG.api

export const login = (tokenId) => window.fetch(window.CONFIG.api.baseUrl + '/login/google', {
  method: 'POST',
  body: JSON.stringify({ tokenId }),
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
}).then(response => response.json())
