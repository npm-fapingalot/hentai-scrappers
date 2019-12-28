import { ID } from '../post';
import { IContent, ITag, IID } from '../../schema.base';

/**
 * The object used to describe post list elements. Ie the home screen, ...
 */
export interface IPrevPost extends IID<ID> {
  /**
   * The tags
   */
  tags: ITag[];

  /**
   * The image conetnt
   */
  content: IContent[] | IContent;
}
