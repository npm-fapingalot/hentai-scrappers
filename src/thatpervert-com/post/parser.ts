import * as SELECTOR from './selectors';
import { isEmpty, isDefined } from '../../parse.utils';
import { IPost } from '.';
import { IContent, ITag, IStdTaging } from '../../schema.base';

// SELECTOR
export const getPages = ($: CheerioStatic): IContent[] =>
  $(SELECTOR.DATA_CONTAINER).map((_, elRaw) => {
    const el = $(elRaw);

    return {
      conetntURL: [
        el.find(SELECTOR.LINK_PHOTO).attr('href'),
        el.find(SELECTOR.GIF).attr('href'),

        ...el.find(SELECTOR.VIDEO).map((i2, el2) => $(el2).attr('src')).get(),
        el.find(SELECTOR.IMG).attr('src'),
      ].filter(isDefined) // Remove undefinded
    } as IContent;
  }).get()
    .filter(({ conetntURL }) => conetntURL.length !== 0); // Remove empty

export const getTags = ($: CheerioStatic): IStdTaging => ({
  tags: $(SELECTOR.TAG)
    .map((_, elRaw) => {
      const el = $(elRaw);

      return {
        name: el.attr('title'),
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
