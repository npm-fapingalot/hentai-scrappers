import { toInt, regexExtract } from '../../parse.utils';
import parse from './parser';
import { ID, IPost } from './schema';
import PostBaseAPI, { isValidHref } from '../../post.base';
import API from '..';

export const HREF_REGEX = /\/?post\/show\/(\d+)\/?/i;

export default class PostAPI extends PostBaseAPI<API, IPost> {
  constructor(api: API) { super(api); }

  async id(id: ID) {
    return parse(await this.api.cheerio(`/post/show/${id}/`), id);
  }

  idFromHref(href: string): ID | null {
    return isValidHref(this, href) ? toInt(regexExtract(href, HREF_REGEX)) : null;
  }
}

export * from './schema';
