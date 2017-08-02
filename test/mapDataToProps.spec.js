import mapDataToProps from '../src/mapDataToProps';
import data from './fixture/post';

describe('mapDataToProps', () => {
  it('should return false if post data is invalid', () => {
    const post = Object.assign({}, data);
    delete post.html_title;

    expect(mapDataToProps(post)).to.be.false;
  });

  it('should transform HubSpot data to a marq structure', () => {
    const props = mapDataToProps(data);

    expect(props.marq.id).to.equal(data.id);
    expect(props.marq.title).to.equal(data.html_title);
    expect(props.marq.date).to.equal('2016-12-16');
    expect(props.marq.description).to.equal(data.meta_description);
    expect(props.marq.content).to.equal(data.post_body);
    expect(props.marq.slug).to.equal('awesome-post');
    expect(props.marq.fileName).to.equal('2016-12-16-awesome-post.md');
  });

  it('should have front-matter sanitized content', () => {
    const props = mapDataToProps(data);

    expect(props.marq.front_matter).to.exist;
    expect(props.marq.front_matter.title).to.exist;
    expect(props.marq.front_matter.description).to.exist;
  });

  it('should provide featuredImage data if applicable', () => {
    const newData = Object.assign({}, data, {
      featured_image: 'yes.png',
      featured_image_alt_text: 'yes',
    });

    const props = mapDataToProps(newData);

    expect(props.marq.featuredImage).to.exist;
    expect(props.marq.featuredImage.src).to.equal('yes.png');
    expect(props.marq.featuredImage.alt).to.equal('yes');
  });

  it('should not provide featuredImage object if undefined', () => {
    const props = mapDataToProps(data);

    expect(props.marq.featuredImage).to.equal(null);
  });
});
