import NHentaiAPI from '..';

const api = (new NHentaiAPI()).post;

describe('#hrefToID', () => {
  test('Working', async () => {
    expect(api.idFromHref('https://konachan.org/post/show/297045/')).toBe(null);

    expect(api.idFromHref('https://konachan.net/post/show/297045/')).toBe(297045);
    expect(api.idFromHref('/post/show/297045/')).toBe(297045);
  }, 20000000);
});
