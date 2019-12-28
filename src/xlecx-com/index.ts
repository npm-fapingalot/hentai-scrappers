import ComicAPI from './comic';
import ListAPI from './list';
import TagAPI from './tags';
import BaseAPI from '../api.base';

export default class XLecXAPI extends BaseAPI {
  public readonly comic = new ComicAPI(this);
  public readonly list = new ListAPI(this);
  public readonly tags = new TagAPI(this);

  constructor(baseURL = 'https://xlecx.com') {
    super(baseURL);
  }
}
