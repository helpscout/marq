import getEndpointUrl from '../../src/utils/getEndpointUrl';

describe('utils', () => {
  describe('getEndpointUrl', () => {
    it('should return false if url or params is invalid', () => {
      expect(getEndpointUrl()).to.be.false;
      expect(getEndpointUrl('http://www.google.ca')).to.be.false;
      expect(getEndpointUrl('http://www.google.ca'), 123).to.be.false;
      expect(getEndpointUrl({ id: 123 })).to.be.false;
    });

    it('should add an ending slash to URL of slash is missing', () => {
      const url = 'https://www.website.com';
      expect(getEndpointUrl(url, {})).to.equal(`${url}/`);
    });

    it('should not include a url query if params is empty', () => {
      const url = 'https://www.website.com/';
      expect(getEndpointUrl(url, {})).to.equal(url);
    });

    it('should include url query for a valid param object', () => {
      const url = 'https://www.website.com';
      const params = {
        api: 123,
        id: 456,
      };

      expect(getEndpointUrl(url, params)).to.equal(`${url}/?api=123&id=456`);
    });
  });
});
