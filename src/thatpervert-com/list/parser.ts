import * as SELECTOR from './selectors';
import * as P_SELECTOR from '../post/selectors';
import { toInt, regexExtract, isDefined, isUndefined } from '../../parse.utils';
import { IPrevPost } from '.';
import { HREF_REGEX } from '../post';
import { ITag, IContent } from '../../schema.base';

// Parsers
export const getID = (el: Cheerio): number | null =>
  toInt(regexExtract(el.find(SELECTOR.POST_LINK).attr('href'), HREF_REGEX));

export const getTags = ($: CheerioStatic, el: Cheerio): ITag[] =>
  el.find(SELECTOR.POST_TAG).map((_, tagRaw) => {
    const tag = $(tagRaw);

    return {
      name: tag.attr('title'),
      href: tag.attr('href'),
    } as ITag;
  }).get();

export const getConetnt = ($: CheerioStatic, pEl: Cheerio): IContent[] =>
  pEl.find(SELECTOR.POST_CONTENT).map((_, elRaw) => {
    const el = $(elRaw);

    return {
      conetntURL: [
        el.find(P_SELECTOR.LINK_PHOTO).attr('href'),
        el.find(P_SELECTOR.GIF).attr('href'),

        ...el.find(P_SELECTOR.VIDEO).map((i2, el2) => $(el2).attr('src')).get(),
        el.find(P_SELECTOR.IMG).attr('src'),
      ].filter(isDefined) // Remove undefinded
    } as IContent;
  }).get()
    .filter(({ conetntURL }) => conetntURL.length !== 0); // Remove empty

// Main parsers
export default ($: CheerioStatic): IPrevPost[] => {
  return $(SELECTOR.POST).map((ignore, elRaw) => {
    const el = $(elRaw);

    const id = getID(el);
    if (isUndefined(id)) { throw new Error('Invalid id: ' + id); }

    const content = getConetnt($, el);
    if (!content.length) { throw new Error('There is no content'); }

    return {
      id,
      tags: getTags($, el),
      content,
    } as IPrevPost;
  }).get();
};
