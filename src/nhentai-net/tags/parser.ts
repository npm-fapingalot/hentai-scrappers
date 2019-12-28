import * as SELECTOR from './selectors';
import { getRootText } from '../../parse.utils';
import { ITag } from '../../schema.base';


export default ($: CheerioStatic): ITag[] => {
  return $(SELECTOR.TAG).map((_, elRaw) => {
    const el = $(elRaw);

    return {
      name: getRootText(el),
      href: el.attr('href'),
    };
  }).get();
};

