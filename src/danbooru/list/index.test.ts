import API from '..';

const api = (new API()).list;

describe('#home', () => {
  test('Compatibility', async () => {
    const posts = await api.home();

    expect(posts).toBeDefined();
    expect(posts.length).toBeGreaterThan(1);
  }, 2000000);
});

describe('#tag', () => {
  test('Compatibility', async () => {
    const posts = await api.tag('x-ray');

    expect(posts).toBeDefined();
    expect(posts.length).toBeGreaterThan(1);
  }, 2000000);
});
