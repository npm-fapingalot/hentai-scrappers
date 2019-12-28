import NHentaiAPI from '..';

const api = (new NHentaiAPI()).post;

describe('#hrefToID', () => {
  test('Working', async () => {
    expect(api.idFromHref('https://rule34.org/index.php?page=post&s=view&id=3549003')).toBe(null);

    expect(api.idFromHref('https://rule34.xxx/index.php?page=post&s=view&id=3549003')).toBe(3549003);
    expect(api.idFromHref('/index.php?page=post&s=view&id=3549003')).toBe(3549003);
  }, 20000000);
});
