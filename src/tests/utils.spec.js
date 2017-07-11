import { getDate, getFileName, sanitize, slugify } from '../utils';

describe('utils', () => {
  describe('getDate', () => {
    it('should transform a timestamp into a YYYY-MM-DD date', () => {
      const timestamp = 1481854349000;
      const date = getDate(timestamp);

      expect(date).to.equal('2016-12-16');
    });

    it('should return false if argument is not a number', () => {
      expect(getDate('1481854349000')).to.be.false;
      expect(getDate({ date: 1481854349000 })).to.be.false;
      expect(getDate([1481854349000])).to.be.false;
    });
  });

  describe('getFileName', () => {
    it('should only accept string arguments', () => {
      expect(getFileName(2016, 123)).to.be.false;
      expect(getFileName({ date: '2016-10-01', slug: '123' })).to.be.false;
    });

    it('should transform date + slug into an .md file name', () => {
      const fileName = getFileName('2011-01-01', '/blog/hello/');

      expect(fileName).to.equal('2011-01-01-hello.md');
    });
  });

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
