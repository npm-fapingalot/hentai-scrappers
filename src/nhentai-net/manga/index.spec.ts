import NHentaiAPI from '..';

const api = (new NHentaiAPI()).manga;

describe('#hrefToID', () => {
  test('Working', async () => {
    expect(api.idFromHref('https://nhentai.org/g/295063/')).toBe(null);

    expect(api.idFromHref('https://nhentai.net/g/295063/')).toBe(295063);
    expect(api.idFromHref('/g/295063/')).toBe(295063);
  }, 20000000);
});
