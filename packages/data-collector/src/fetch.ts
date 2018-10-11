import * as cheerio from 'cheerio'
import fetch from 'node-fetch'

const getData = async () => {
  const html = await fetch(
    'https://tokenmarket.net/blockchain/ethereum/assets/0x/'
  ).then(res => res.text())
  const $ = cheerio.load(html)
  const whitePaperLink = $('a[title=Whitepaper]').attr('href')
  const teamSection = $('div.team-section-wrapper')
    .find('td')
    .toArray()
  const teamList = teamSection[0].children
    .filter(el => el.name === 'p')
    .map(el => el.children.pop().data.trim())
  const countryOfOrigin = teamSection[1].children.pop().data.trim()
  // const tokenSaleDates = $('div.dates-wrapper')
  //   .find('span')
  //   .toArray()
  const websiteUrl = $('a.visit-website').attr('href')
  const status = $('span.asset-status').text()
  const asd = $('div.team-section-wrapper > table tr:last-child').text()
  // .find('td')[
  //   '0'
  // ]
  console.log(asd)
  // console.log(blockChain)
}

getData()
