import * as SELECTOR from './selectors';
import { regexExtract, isEmpty, getRootText, isDefined, isSomething, renameKeys } from '../../parse.utils';
import { IPost } from '.';
import { IContent, ITagged, ITag, IStdTaging } from '../../schema.base';

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


export const getTags = ($: CheerioStatic): IStdTaging => {
  const info: ITagged = {};
  $(SELECTOR.TAGS_CONTAINER)
    .each((_, elRaw) => {
      const el = $(elRaw);

      // Tag type
      const tagType = ((): string => {
        const clazz = el.attr('class') as string;
        if (isEmpty(clazz)) { throw new Error('Failed to get classes'); }

        const typeName = clazz.split(' ')
          .map((v) => regexExtract(v, /tag-type-(\w+)/i))
          .filter(isSomething);
        if (!typeName[0]) { throw new Error('Tag type not found'); }

        return typeName[0];
      })();

      // The tag
      const tags = el.find(SELECTOR.CONTAINER_TAG)
        .map((_, tagRaw) => {
          const tag = $(tagRaw);

          return {
            name: getRootText(tag),
            href: tag.attr('href'),
          } as ITag;
        }).get();

      info[tagType] = [...(info[tagType] || []), ...tags];
    });

  return renameKeys(info, {
    character: 'characters',
    general: 'tags',
    artist: 'artists',
    copyright: 'copyrights',
    style: 'styles'
  });
};

export default ($: CheerioStatic, id: number): IPost => {
  const content = getPages($);
  if (!content.length) { throw new Error('There is no content'); }

  return {
    id,

    tags: getTags($),
    content,
  };
};
