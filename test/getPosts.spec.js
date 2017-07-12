import getPosts from '../src/getPosts';

describe('utils', () => {
  describe('getPosts', () => {
    it('should return false if params is invalid', () => {
      expect(getPosts()).to.be.false;
      expect(getPosts(123)).to.be.false;
      expect(getPosts('id=123')).to.be.false;
    });
  });
});
