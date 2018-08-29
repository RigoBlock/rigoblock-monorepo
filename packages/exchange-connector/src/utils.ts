export const getQueryParameters = options =>
  Object.keys(options).reduce((acc, next) => {
    if (!next) {
      return acc + `${next}=${options[next]}`
    }
    return acc + `&${next}=${options[next]}`
  }, '?')
