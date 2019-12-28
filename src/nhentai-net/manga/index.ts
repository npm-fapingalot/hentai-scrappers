import { toInt, regexExtract } from '../../parse.utils';
import parse from './parser';
import { ID, IManga } from './schema';
import PostBaseAPI, { isValidHref } from '../../post.base';
import API from '..';

export const HREF_REGEX = /\/?(g|gallery)\/(\d+)\/?/i;

export default class MangaAPI extends PostBaseAPI<API, IManga> {
  constructor(api: API) { super(api); }

  async id(id: ID) {
    return parse(await this.api.cheerio(`/g/${id}/`), id);
  }

  idFromHref(href: string): ID | null {
    return isValidHref(this, href) ? toInt(regexExtract(href, HREF_REGEX, 2)) : null;
  }
}

export * from './schema';
