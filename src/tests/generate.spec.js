import { readPost } from './helpers';
import { generate, savePost } from '../generate';
import mapDataToProps from '../mapDataToProps';
import data from './fixture/post';

const posts = [data];
const dir = './test-dir';

describe('generate', () => {
  describe('savePost', () => {
    it('should output .md file from a post', () => {
      generate(dir)(posts);

      const postProps = mapDataToProps(posts[0]);
      const post = readPost(dir)(postProps);

      expect(post).to.exist;
      expect(post).to.be.a('string');

      expect(post).to.contain(postProps.front_matter.title);
      expect(post).to.contain(postProps.front_matter.description);
      expect(post).to.contain(postProps.content);
    });

    it('should return false if post data is invalid', () => {
      expect(savePost(dir)({ wut: 'stuff'})).to.be.false;
    });
  });
});
