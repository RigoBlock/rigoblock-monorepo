import { TokenOverview } from './sources/overview'

const getData = async () => {
  const overview = new TokenOverview()
  const data = await overview.rip('ZRX')
  console.log(data)
}

getData()
