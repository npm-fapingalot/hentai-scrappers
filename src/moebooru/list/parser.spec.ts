import { getID } from './parser';

describe('#getID', () => {
  test('Working', () => {
    const $ = { find: ((selector: string) => ({ attr: (attr: string) => '/post/show/297051/' })) } as Cheerio;
    expect(getID($)).toBe(297051);
  });
});
