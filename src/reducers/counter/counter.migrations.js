const migrations = {
  0: state => {
    const newState = {
      ...state,
      test: 150
    }
    return newState
  }
}

export default migrations
