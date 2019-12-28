import API from '..';
import parse from './parser';

export default class TagAPI {
  constructor(private api: API) { }

  async tags() { return parse(await this.api.cheerio(`/tags/`)); }
}
