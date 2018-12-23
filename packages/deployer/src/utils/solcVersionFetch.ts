import fetch from 'node-fetch'

export default async () => {
  const solcJson = await fetch(
    'https://raw.githubusercontent.com/ethereum/solc-bin/gh-pages/bin/list.json'
  ).then(res => res.json())
  return solcJson.releases
}
