import NHentaiAPI from '..';

const api = (new NHentaiAPI()).post;

describe('#id', () => {
  test('Compatibility', async () => {
    const post = await api.id(296990);

    expect(post).toBeDefined();
    expect(post).toHaveProperty('id', 296990);
  }, 20000000);
});
