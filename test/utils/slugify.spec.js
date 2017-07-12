import slugify from '../../src/utils/slugify';

describe('utils', () => {
  describe('slugify', () => {
    it('should output a string', () => {
      const o = slugify(123);

      expect(o).to.be.a('string');
    });

    it('should transform to lowercase', () => {
      const o = slugify('HELLO');

      expect(o).to.equal('hello');
    });

    it('should replace spaces with hyphens', () => {
      const o = slugify('HELLO there');

      expect(o).to.equal('hello-there');
    });

    it('should remove non-word characters', () => {
      const o = slugify('HELLO there, [100%] !@#$%^&*()!!!');

      expect(o).to.equal('hello-there-100');
    });

    it('should replace multiple hyphens with a single hyphen', () => {
      const o = slugify('hello-----------------------there');

      expect(o).to.equal('hello-there');
    });

    it('should trim hyphens from start/end', () => {
      const o = slugify('----/-/--hello-there----!--///--------@!#-----');

      expect(o).to.equal('hello-there');
    });
  });
});
