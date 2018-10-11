import * as cheerio from 'cheerio'
import fetch from 'node-fetch'

const getData = async () => {
  const html = await fetch(
    'https://tokenmarket.net/blockchain/ethereum/assets/0x/'
  ).then(res => res.text())
  const $ = cheerio.load(html)
  const whitePaperLink = $('a[title=Whitepaper]').attr('href')
  const teamList = []
  $('div.team-section-wrapper > table.table')
    .find($('td > p'))
    .each((i, elem) => {
      const data = elem.children.pop().data.trim()
      teamList.push(data)
    })
  const countryOrigin
}

getData()
