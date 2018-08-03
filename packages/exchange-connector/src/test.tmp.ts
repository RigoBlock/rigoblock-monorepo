import { getAddressBySymbol } from './tokens'

async function get() {
  const result = await getAddressBySymbol('WETH')
  console.log(result)
}

get()
