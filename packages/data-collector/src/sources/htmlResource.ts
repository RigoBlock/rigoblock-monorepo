import * as cheerio from 'cheerio'
import fetch from 'node-fetch'

export class HtmlResource {
  constructor() {}
  public async fetch(url) {
    const response = await fetch(url)
    if (response.status !== 200) {
      throw new Error(`Status: ${response.status}: ${response.body}`)
    }
    return response
  }
  public loadHTML(html) {
    return cheerio.load(html)
  }
  public normalizeText(str) {
    return str.trim().toLowerCase()
  }
}
