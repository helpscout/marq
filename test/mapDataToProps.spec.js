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

    expect(props.id).to.equal(data.id);
    expect(props.title).to.equal(data.html_title);
    expect(props.date).to.equal('2016-12-16');
    expect(props.author.id).to.equal(data.author_user_id);
    expect(props.author.username).to.equal(data.author_username);
    expect(props.author.name).to.equal(data.author_name);
    expect(props.description).to.equal(data.meta_description);
    expect(props.content).to.equal(data.post_body);
    expect(props.slug).to.equal('awesome-post');
    expect(props.fileName).to.equal('2016-12-16-awesome-post.md');
  });

  it('should have front-matter sanitized content', () => {
    const props = mapDataToProps(data);

    expect(props.front_matter).to.exist;
    expect(props.front_matter.title).to.exist;
    expect(props.front_matter.description).to.exist;
  });
});
