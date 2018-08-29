export const getQueryParameters = options =>
  Object.keys(options).reduce((acc, next, index) => {
    if (index === 0) {
      return acc + `${next}=${options[next]}`
    }
    return acc + `&${next}=${options[next]}`
  }, '?')
