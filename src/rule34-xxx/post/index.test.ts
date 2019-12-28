import NHentaiAPI from '..';

const api = (new NHentaiAPI()).post;

describe('#id', () => {
  test('Compatibility', async () => {
    const post = await api.id(3550695);

    expect(post).toBeDefined();
    expect(post).toHaveProperty('id', 3550695);
  }, 20000000);
});
