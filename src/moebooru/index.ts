import ListAPI from './list';
import PostAPI from './post';
import BaseAPI from '../api.base';

export default class MoebooruAPI extends BaseAPI {
  public readonly post = new PostAPI(this);
  public readonly list = new ListAPI(this);

  constructor(baseURL = 'https://konachan.net') {
    super(baseURL);
  }
}
