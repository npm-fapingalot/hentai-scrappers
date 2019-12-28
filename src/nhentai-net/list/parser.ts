import * as SELECTOR from './selectors';
import { getText, toInt, regexExtract, isEmpty, isUndefined } from '../../parse.utils';
import { IPrevManga } from '.';

// Parsers
export const ID_REGEX = /^\/(g|gallery)\/(\d+)\/$/i;
export const getID = ($: Cheerio): number | null =>
  toInt(regexExtract($.find(SELECTOR.MANGA_LINK).attr('href'), ID_REGEX, 2));

// Main parsers
export default ($: CheerioStatic): IPrevManga[] => {
  return $(SELECTOR.MANGA).map((_, elRaw) => {
    const el = $(elRaw);

    const id = getID(el);
    if (isUndefined(id)) { throw new Error('Invalid id: ' + id); }

    const thumbnail = ((tEl: Cheerio) => tEl.attr('data-src') || tEl.attr('src'))(el.find(SELECTOR.MANGA_IMG));
    if (isEmpty(thumbnail)) { throw new Error('Thumbnail is empty'); }

    const title = getText(el.find(SELECTOR.MANGA_TITLE));
    if (!title) { throw new Error('Title is empty'); }

    return {
      id,
      thumbnail,
      title,
    } as IPrevManga;
  }).get();
};
