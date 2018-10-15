import * as cheerio from 'cheerio'
import fetch from 'node-fetch'

export class HtmlResource {
  constructor() {}
  public fetch(url) {
    return fetch(url)
  }
  public loadHTML(html) {
    return cheerio.load(html)
  }
  public normalizeText(str) {
    return str.trim().toLowerCase()
  }
}
