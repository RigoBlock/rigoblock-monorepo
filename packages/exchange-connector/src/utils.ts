export const getRequestOptions = (url: string, qs?: object) => ({
  json: true,
  method: 'GET',
  qs,
  url
})
