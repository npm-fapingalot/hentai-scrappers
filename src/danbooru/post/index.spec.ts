import API from '..';

const api = (new API()).post;

describe('#hrefToID', () => {
  test('Working', async () => {
    expect(api.idFromHref('https://danbooru.donmai.net/posts/297045/')).toBe(null);

    expect(api.idFromHref('https://danbooru.donmai.us/posts/297045/')).toBe(297045);
    expect(api.idFromHref('/posts/297045/')).toBe(297045);
  }, 20000000);
});
