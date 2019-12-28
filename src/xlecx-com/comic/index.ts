import { regexExtract } from '../../parse.utils';
import parse from './parser';
import { ID, IComic } from './schema';
import PostBaseAPI, { isValidHref } from '../../post.base';
import API from '..';

export const HREF_REGEX = /\/?(\d+(-\w+)+)\.html\/?/i;

export default class ComicAPI extends PostBaseAPI<API, IComic> {
  constructor(api: API) { super(api); }

  async id(id: ID) {
    return parse(await this.api.cheerio(`/${id}.html`), id);
  }

  idFromHref(href: string): ID | null {
    return isValidHref(this, href) ? regexExtract(href, HREF_REGEX) : null;
  }
}

export * from './schema';
