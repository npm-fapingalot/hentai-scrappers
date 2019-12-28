import ListAPI from './list';
import PostAPI from './post';
import BaseAPI from '../api.base';

export default class DanbooruAPI extends BaseAPI {
  public readonly post = new PostAPI(this);
  public readonly list = new ListAPI(this);

  constructor(baseURL = 'https://danbooru.donmai.us/') {
    super(baseURL);
  }
}
