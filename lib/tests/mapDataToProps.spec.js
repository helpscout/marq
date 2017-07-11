import mapDataToProps from '../mapDataToProps';

describe('mapDataToProps', () => {
  it('should transform HubSpot data to a h2jk structure', () => {
    const data = {
      id: 123,
      html_title: 'HTML: Title',
      publish_date: 1481854349000,
      author_user_id: 12,
      author_username: 'ms_author',
      author_user: 'Ms. Author',
      meta_description: 'This is so meta',
      post_body: '<strong>Super meta!</strong>',
      slug: 'awesome-post!!!!!!',
    };

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
});
