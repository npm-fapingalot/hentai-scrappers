import { ID } from '../post';
import { IID } from '../../schema.base';

/**
 * The object used to describe post list elements. Ie the home screen, ...
 */
export interface IPrevPost extends IID<ID> {
  /**
   * The thumbnail image
   */
  thumbnail: string;
}
