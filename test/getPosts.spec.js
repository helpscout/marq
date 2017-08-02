import getPosts from '../src/getPosts';

// Demo keys
// https://developers.hubspot.com/docs/methods/blogv2/get_blog_posts
const stubOptions = {
  hapikey: 'demo',
  content_group_id: '351076',
};

describe('getPosts', () => {
  it('should return false if params is invalid', () => {
    expect(getPosts()).to.be.rejected;
    expect(getPosts(123)).to.be.rejected;
    expect(getPosts('id=123')).to.be.rejected;
  });

  it('should fetch from Hubspot with correct options', () => {
    expect(getPosts(stubOptions)).to.be.fulfilled;
  });

  it('should reject if options are incorrect', () => {
    expect(getPosts({ fake: true })).to.be.rejected;
  });
});
