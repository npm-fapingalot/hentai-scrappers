import { ID } from '../manga';
import { IID } from '../../schema.base';

/**
 * The object used to describe manga list elements. Ie the home screen, ...
 */
export interface IPrevManga extends IID<ID> {
  /**
   * The thumbnail image
   */
  thumbnail: string;

  /**
   * The title of the manga
   */
  title: string;
}
