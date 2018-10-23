const fetch = require('node-fetch')

const init = async () => {
  const response = await fetch(
    'https://influx.stats.endpoint.network/query?db=telegraf&q=SELECT%20mean%28%22value%22%29%20AS%20%22mean_value%22%20FROM%20%22telegraf%22.%22autogen%22.%22totalsupply%22%20WHERE%20time%20%3E%20now%28%29%20-%201h%20AND%20%22network%22=%273%27%20GROUP%20BY%20time%281m%29,%20%22id%22%20FILL%28previous%29',
    {
      method: 'GET',
      headers: {
        Authorization: 'Basic cmlnb2Jsb2NrOnJpZ29ibG9jaw==',
        'Postman-Token': '8ca8bf2d-9b43-46b8-88de-2b8fd3edec4f',
        'cache-control': 'no-cache'
      }
    }
  ).then(res => res.json())
  console.log(response.results[0].series)
}

init()
