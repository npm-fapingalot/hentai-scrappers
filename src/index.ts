import DanbooruAPI from './danbooru';
import GelbooruAPI from './gelbooru';
import MoebooruAPI from './moebooru';
import NHentaiAPI from './nhentai-net';
import Rule34API from './rule34-xxx';
import ThatpervertAPI from './thatpervert-com';
import XLecXAPI from './xlecx-com';
import BaseAPI from './api.base';
import { isEmpty, regexExtract } from './parse.utils';
import PostBaseAPI from './post.base';

const parsers = [
  new DanbooruAPI('https://danbooru.donmai.us'),
  new GelbooruAPI('https://gravityfalls.booru.org'),
  new MoebooruAPI('https://konachan.net'),
  new MoebooruAPI('https://www.lolibooru.moe'),
  new NHentaiAPI('https://nhentai.net'),
  new Rule34API('https://rule34.xxx'),
  new ThatpervertAPI('http://thatpervert.com'),
  new XLecXAPI('https://xlecx.com'),
].reduce((agg, parser: BaseAPI) => ({ ...agg, [parser.baseURL.toLocaleLowerCase()]: parser }), {} as { [url: string]: BaseAPI; });

if (require.main === module) {
  const href = process.argv[2];
  if (isEmpty(href)) { throw new Error('Href is empty'); }

  const url = regexExtract(href.toLocaleLowerCase(), /^(https?\:\/\/[\w\.\-]+)\//i);
  if (isEmpty(url)) { throw new Error('No url found'); }

  const parser: any = parsers[url];
  if (parser === undefined) { throw new Error('Not parser found'); }

  // tslint:disable-next-line: max-line-length
  const post = (parser.post ? parser.post : (parser.manga ? parser.manga : (parser.comic ? parser.comic : null))) as PostBaseAPI<any, any> | undefined;
  if (post === undefined) { throw new Error('Not post found'); }

  post.id(post.idFromHref(href)).then((d) => {
    // tslint:disable-next-line: no-console
    console.log(JSON.stringify(d, null, 2));
  });
}

export {
  DanbooruAPI,
  GelbooruAPI,
  MoebooruAPI,
  NHentaiAPI,
  Rule34API,
  ThatpervertAPI,
  XLecXAPI,
};
