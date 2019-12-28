import { ID } from '../comic';
import { IID } from '../../schema.base';

/**
 * The object used to describe comic list elements. Ie the home screen, ...
 */
export interface IPrevComic extends IID<ID> {
  /**
   * The thumbnail image
   */
  thumbnail: string;

  /**
   * The title of the comic
   */
  title: string;
}
