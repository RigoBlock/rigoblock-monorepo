import fetch from 'node-fetch'

export default async () => {
  const solcJson = await fetch(
    'https://cdn.rawgit.com/ethereum/solc-bin/gh-pages/bin/list.json'
  ).then(res => res.json())
  return solcJson.releases
}
