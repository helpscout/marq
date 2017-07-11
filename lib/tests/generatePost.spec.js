import generatePost from '../generatePost';
import mapDataToProps from '../mapDataToProps';

// Fake data
const data = {
  id: 123,
  html_title: 'Title',
  publish_date: 1481854349000,
  author_user_id: 12,
  author_username: 'ms_author',
  author_user: 'Ms. Author',
  meta_description: 'This is so meta',
  post_body: '<strong>Super meta!</strong>',
  slug: 'awesome-post!!!!!!',
};

describe('generatePost', () => {
  it('should output a Jekyll post (string) from data', () => {
    const props = mapDataToProps(data);
    const post = generatePost(props);

    expect(post).to.contain('title: Title');
    expect(post).to.contain('date: 2016-12-16');
    expect(post).to.contain('slug: awesome-post');
    expect(post).to.contain(props.content);
  });
});
