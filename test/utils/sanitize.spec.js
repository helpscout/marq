import sanitize from '../../src/utils/sanitize';

describe('utils', () => {
  describe('sanitize', () => {
    it('should transform argument to string', () => {
      expect(sanitize(123)).to.be.a('string');
      expect(sanitize([0])).to.be.a('string');
    });

    it('should escape double quote (")', () => {
      const text = 'Hello "there"';
      expect(sanitize(text)).to.equal('Hello "there"');
    });
  });
});
