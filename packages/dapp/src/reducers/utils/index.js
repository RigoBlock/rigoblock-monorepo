export const composeReducers = (...fns) => (state, action) =>
  fns.reduceRight((arg, f) => f(arg, action), state)
