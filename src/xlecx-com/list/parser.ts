import * as SELECTOR from './selectors';
import { getText, regexExtract, isEmpty, isUndefined } from '../../parse.utils';
import { IPrevComic } from '.';
import { HREF_REGEX } from '../comic';

// Parsers
export const getID = ($: Cheerio): string | null =>
  regexExtract($.find(SELECTOR.POST_LINK).attr('href'), HREF_REGEX);

// Main parsers
export default ($: CheerioStatic): IPrevComic[] => {
  return $(SELECTOR.POST).map((_, elRaw) => {
    const el = $(elRaw);

    const id = getID(el);
    if (isUndefined(id)) { throw new Error('Invalid id: ' + id); }

    const thumbnail = ((tEl: Cheerio) => tEl.attr('data-src') || tEl.attr('src'))(el.find(SELECTOR.POST_IMG));
    if (isEmpty(thumbnail)) { throw new Error('Thumbnail is empty'); }

    const title = getText(el.find(SELECTOR.POST_TITLE));
    if (isEmpty(title)) { throw new Error('Title is empty'); }

    return {
      id,
      thumbnail,
      title,
    } as IPrevComic;
  }).get();
};
