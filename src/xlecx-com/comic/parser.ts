import * as SELECTOR from './selectors';
import { getText, toInt, regexExtract, isEmpty, getRootText, renameKeys } from '../../parse.utils';
import { IComic } from '.';
import { IContent, ITagged, ITag, IStdTaging } from '../../schema.base';
import { ID } from './schema';

// SELECTOR
export const PAGE_COUNT_REGEX = /(\d+)\s+pages/i;
export const getPageCount = ($: CheerioStatic): number | null =>
  toInt(regexExtract(getText($(SELECTOR.PAGE_COUNT)), PAGE_COUNT_REGEX));

const injectIntoPageURL = (url: string) => {
  const spl = url.split('/');
  return spl.slice(0, 6).join('/') + '/thumbs/' + spl.slice(6).join('/');
};

const injectPrefix = (url: string | null | undefined): string | null => {
  if (isEmpty(url)) { return null; }
  return 'https://xlecx.com' + url;
};

export const getPages = ($: CheerioStatic): IContent[] =>
  $(SELECTOR.THUMBNAIL_IMAGES)
    .map((_, el) => $(el).attr('href') || injectPrefix($(el).attr('data-src')))
    .get()
    .filter((val) => !isEmpty(val))
    .map((imgURL: string) => ({
      thumbnailURL: injectIntoPageURL(imgURL),
      contentURL: [imgURL],
    }));

export const getTags = ($: CheerioStatic): IStdTaging => {
  const info: ITagged = {};
  $(SELECTOR.TAGS_CONTAINER)
    .each((_, elRaw) => {
      const el = $(elRaw);

      // Tag type
      const tagType = getRootText(el);
      if (isEmpty(tagType)) { return; }

      const tags = el.find(SELECTOR.CONTAINER_TAG)
        .map((_, tagRaw) => {
          const tag = $(tagRaw);

          return {
            name: getRootText(tag),
            href: tag.attr('href'),
          } as ITag;
        }).get();

      info[tagType.toLocaleLowerCase().substring(0, tagType.length - 1)] = tags;
    });

  return renameKeys(info, {
    parody: 'parodies',
    character: 'characters',
    tag: 'tags',
    artist: 'artists',
    group: 'groups',
    language: 'languages',
    categorie: 'categories',
  });
};

export default ($: CheerioStatic, id: ID): IComic => {
  const title = getText($(SELECTOR.TITLE));
  if (isEmpty(title)) { throw new Error('Title is empty'); }

  const pageCount = getPageCount($);
  if (!pageCount) { throw new Error('PageCount is empty'); }

  const pages = getPages($);
  if (pages.length !== pageCount) { throw new Error('Page count doesn\'t match pages ' + pages.length + '/' + pageCount); }

  return {
    id,

    title,

    tags: getTags($),
    content: pages,
  };
};
