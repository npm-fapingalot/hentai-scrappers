import * as SELECTOR from './selectors';
import { getText, toInt, regexExtract, isEmpty, getRootText, isUndefined, isSomething, renameKeys } from '../../parse.utils';
import { IManga } from '.';
import { IContent, ITagged, ITag, IStdTaging } from '../../schema.base';

// SELECTOR
export const PAGE_COUNT_REGEX = /(\d+)\s+pages/i;
export const getPageCount = ($: CheerioStatic): number | null =>
  toInt(regexExtract(getText($(SELECTOR.PAGE_COUNT)), PAGE_COUNT_REGEX));

export const FAVORITE_COUNT_REGEX = /\((\d+)\)/i;
export const getFavoriteCount = ($: CheerioStatic): number | null =>
  toInt(regexExtract(getText($(SELECTOR.FAVORITE_COUNT)), FAVORITE_COUNT_REGEX));

export const getPages = ($: CheerioStatic): IContent[] =>
  $(SELECTOR.THUMBNAIL_IMAGES)
    .map((_, elRaw) => ((el: Cheerio) => el.attr('data-src') || el.attr('src'))($(elRaw)))
    .get()
    .filter(isSomething)
    .map((thumbnailURL) => ({
      thumbnailURL,
      contentURL: [
        thumbnailURL
          .replace(/t\.png$/, '.png')
          .replace(/t\.jpg$/, '.jpg')
          .replace(/t\.gif$/, '.gif')
          .replace(/\/\/t/, '//i'),
      ],
    }));

export const getTags = ($: CheerioStatic): IStdTaging => {
  const info: ITagged = {};
  $(SELECTOR.TAGS_CONTAINER)
    .each((_, elRaw) => {
      const el = $(elRaw);

      // Tags type
      const tagType = getRootText(el);
      if (isUndefined(tagType)) { return; }

      // Tags
      const tags = el.find(SELECTOR.CONTAINER_TAG)
        .map((i2, tagRaw) => {
          const tag = $(tagRaw);

          const tagName = getRootText(tag);
          if (isEmpty(tagName)) { return; }

          return ({
            name: tagName,
            href: tag.attr('href'),
          } as ITag);
        }).get();

      info[tagType.toLocaleLowerCase().substring(0, tagType.length - 1)] = tags;
    });

  return renameKeys(info, {});
};

export default ($: CheerioStatic, id: number): IManga => {
  const title = getText($(SELECTOR.TITLE));
  const titleAlt = getText($(SELECTOR.TITLE_ALT));
  if (isEmpty(title)) { throw new Error('Title is empty'); }

  const pageCount = getPageCount($);
  if (!pageCount) { throw new Error('PageCount is empty'); }

  const favorite = getFavoriteCount($);
  if (!favorite) { throw new Error('Favorite is empty'); }

  const coverURL = ((el: Cheerio) => el.attr('data-src') || el.attr('src'))($(SELECTOR.COVER_IMAGE));
  if (isEmpty(coverURL)) { throw new Error('Cover is empty'); }

  const pages = getPages($);
  if (pages.length !== pageCount) { throw new Error('Page count doesn\'t match pages ' + pages.length + '/' + pageCount); }

  return {
    id,

    title,
    titleAlt,

    coverURL,

    tags: getTags($),
    content: pages,

    favorite,
  };
};
