import BaseAPI from './api.base';
import { IData } from './schema.base';

type PropType<TObj, TProp extends keyof TObj> = TObj[TProp];

export const isValidHref = <T extends PostBaseAPI<BaseAPI, any>>(api: T, href: string) =>
  href.startsWith('/') || href.startsWith(api.api.baseURL + '/');

export default abstract class PostBaseAPI<T extends BaseAPI, R extends IData<any, any>> {
  constructor(public readonly api: T) { }

  abstract id(id: PropType<R, 'id'>): Promise<R>;
  abstract idFromHref(href: string): PropType<R, 'id'> | null;

  // Helpers
  isValidHref(href: string): boolean {
    return this.idFromHref(href) != null;
  }
}
