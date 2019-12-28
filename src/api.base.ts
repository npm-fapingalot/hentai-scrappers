import fetch, { RequestInit } from 'node-fetch';
import cheerio from 'cheerio';

export default abstract class BaseAPI {
  constructor(public readonly baseURL: string) {
    this.baseURL = baseURL.replace(/\/$/, '');
  }

  // Helper functions
  public async html(href: string, options?: RequestInit) {
    return await (await fetch(this.baseURL + href, options)).text();
  }
  public async cheerio(href: string, options?: RequestInit) {
    return cheerio.load(await this.html(href, options));
  }
}
