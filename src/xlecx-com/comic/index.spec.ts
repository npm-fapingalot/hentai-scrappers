import NHentaiAPI from '..';

const api = (new NHentaiAPI()).comic;

describe('#hrefToID', () => {
  test('Working', async () => {
    expect(api.idFromHref('https://xlecx.org/7750-sidney-fast-times-rampr-high.html')).toBe(null);

    expect(api.idFromHref('https://xlecx.com/7750-sidney-fast-times-rampr-high.html')).toBe('7750-sidney-fast-times-rampr-high');
    expect(api.idFromHref('/7750-sidney-fast-times-rampr-high.html')).toBe('7750-sidney-fast-times-rampr-high');
  }, 20000000);
});
