const protocol = require('@rigoblock/protocol').default

const getData = async () => {
  const map = await protocol('3')
  // console.log(map)
}

getData()
