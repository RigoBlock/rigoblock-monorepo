import nodeFetch from 'node-fetch'

export const getQueryParameters = (options = {}) =>
  Object.entries(options)
    .map(entry => entry.join('='))
    .reduce((acc, param) => [acc, param].join('&'), '')

export const fetchJSON = (url, params?: string) => {
  const fetch =
    typeof window !== 'undefined' && window.fetch ? window.fetch : nodeFetch
  return fetch([url, params || ''].join('?')).then(r =>
    r.json().catch(error => {
      console.log('Looks like there was a problem: \n', error)
    })
  )
}

// TODO: change this to be (url, body = {})
export const postJSON = (url, body?: any) => {
  const fetch =
    typeof window !== 'undefined' && window.fetch ? window.fetch : nodeFetch
  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  }).then(r => r.json())
}
