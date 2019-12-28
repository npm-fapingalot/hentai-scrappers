import NHentaiAPI from '..';

const api = (new NHentaiAPI()).post;

describe('#hrefToID', () => {
  test('Working', async () => {
    expect(api.idFromHref('http://thatpervert.org/post/4057795')).toBe(null);

    expect(api.idFromHref('http://thatpervert.com/post/4057795')).toBe(4057795);
    expect(api.idFromHref('/post/4057795/')).toBe(4057795);
  }, 20000000);
});

