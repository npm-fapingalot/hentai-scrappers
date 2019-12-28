import * as SELECTOR from './selectors';
import { toInt, regexExtract, isDefined, isUndefined } from '../../parse.utils';
import { IPrevPost } from '../list';
import { HREF_REGEX } from '../post';

// Parsers
export const getID = ($: Cheerio): number | null =>
  toInt(regexExtract($.find(SELECTOR.POST_LINK).attr('href'), HREF_REGEX));

// Main parsers
export default ($: CheerioStatic): IPrevPost[] => {
  return $(SELECTOR.POST).map((_, elRaw) => {
    const el = $(elRaw);

    const id = getID(el);
    if (isUndefined(id)) { throw new Error('Invalid id: ' + id); }

    return {
      id,
      content: {
        conetntURL: [
          el.attr('data-file-url'),
          el.attr('data-source'),
          el.attr('data-large-file-url'),
          el.attr('data-preview-file-url'),
        ].filter(isDefined) // Remove undefinded
      },
    } as IPrevPost;
  }).get().filter(({ content: { conetntURL } }) => conetntURL.length !== 0); // Remove empty
};
