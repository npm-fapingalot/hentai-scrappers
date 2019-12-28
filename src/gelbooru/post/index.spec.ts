import API from '..';

const api = (new API()).post;

describe('#hrefToID', () => {
  test('Working', async () => {
    expect(api.idFromHref('https://gravityfalls.booru.net/index.php?page=post&s=view&id=57983')).toBe(null);

    expect(api.idFromHref('https://gravityfalls.booru.org/index.php?page=post&s=view&id=57983')).toBe(57983);
    expect(api.idFromHref('/index.php?page=post&s=view&id=57983')).toBe(57983);
  }, 20000000);
});
