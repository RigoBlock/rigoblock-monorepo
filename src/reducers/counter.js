export default function counter(state = 0, action) {
  switch (action.type) {
    case 'COUNTER_ADD':
      return (state += action.amount)
    default:
      return state
  }
}
