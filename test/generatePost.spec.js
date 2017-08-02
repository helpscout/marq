import generatePost from '../src/generatePost';
import mapDataToProps from '../src/mapDataToProps';
import data from './fixture/post';

describe('generatePost', () => {
  it('should output a Jekyll post (string) from data', () => {
    const props = mapDataToProps(data);
    const post = generatePost()(props);

    expect(post).to.contain('title: "HTML: Title"');
    expect(post).to.contain('date: "2016-12-16"');
    expect(post).to.contain('slug: "awesome-post"');
    expect(post).to.contain(props.marq.content);
  });
});
