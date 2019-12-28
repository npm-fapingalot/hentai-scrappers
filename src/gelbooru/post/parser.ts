import * as SELECTOR from './selectors';
import { isEmpty, getRootText, isDefined} from '../../parse.utils';
import { IPost } from '.';
import { IContent, ITag, IStdTaging } from '../../schema.base';

// SELECTOR
export const getPages = ($: CheerioStatic): IContent[] =>
  [{
    contentURL: [
      ...$(SELECTOR.VIDEO).map((e, el) => $(el).attr('src')).get(),
      $(SELECTOR.ORIGINAL).attr('href'),
      $(SELECTOR.HIGH_RES).attr('href'),
      $(SELECTOR.HIGH_RES_SHOW).attr('href'),
      $(SELECTOR.PREVIEW).attr('src'),
    ].filter(isDefined) // Remove undefinded
  }].filter(({ contentURL }) => contentURL.length !== 0); // Remove empty

export const getTags = ($: CheerioStatic): IStdTaging => ({
  tags: $(SELECTOR.TAG)
    .map((_, elRaw) => {
      const el = $(elRaw);

      return {
        name: getRootText(el),
        href: el.attr('href')
      } as ITag;
    }).get().filter((v) => !isEmpty(v.name) && !isEmpty(v.href)),
});

export default ($: CheerioStatic, id: number): IPost => {
  const content = getPages($);
  if (!content.length) { throw new Error('There is no content'); }

  return {
    id,

    tags: getTags($),
    content,
  };
};
