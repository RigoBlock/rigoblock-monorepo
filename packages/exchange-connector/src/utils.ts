export const getQueryParameters = (options = {}) =>
  Object.entries(options)
    .map(entry => entry.join('='))
    .reduce((acc, param) => [acc, param].join('&'), '')

export const fetchJSON = (url, params?: string) =>
  fetch([url, params || ''].join('?')).then(r => r.json())

export const postJSON = (url, body) =>
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  }).then(r => r.json())
