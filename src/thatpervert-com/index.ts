import ListAPI from './list';
import PostAPI from './post';
import BaseAPI from '../api.base';

export default class ThatpervertAPI extends BaseAPI {
  public readonly post = new PostAPI(this);
  public readonly list = new ListAPI(this);


  constructor(baseURL = 'http://thatpervert.com') {
    super(baseURL);
  }
}
