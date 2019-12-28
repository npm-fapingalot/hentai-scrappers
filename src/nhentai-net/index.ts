import MangaAPI from './manga';
import ListAPI from './list';
import TagAPI from './tags';
import BaseAPI from '../api.base';

export default class NHentaiAPI extends BaseAPI {
  public readonly manga = new MangaAPI(this);
  public readonly list = new ListAPI(this);
  public readonly tags = new TagAPI(this);

  constructor(baseURL = 'https://nhentai.net/') {
    super(baseURL);
  }
}
