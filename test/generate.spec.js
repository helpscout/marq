import { readPost, dirExists } from './helpers';
import generate from '../src/generate';
import mapDataToProps from '../src/mapDataToProps';
import data from './fixture/post';

const posts = [data];
const dir = './test-dir';

describe('generate', () => {
  it("should return false if dir argument isn't valid", () => {
    expect(generate(123)(posts)).to.be.false;
  });

  it('should resolve promise if posts are valid', () => {
    expect(generate(dir)(posts)).to.be.fulfilled;
  });

  it('should output .md file into default dir', done => {
    generate()(posts)
      .then(() => {
        const postProps = mapDataToProps(posts[0]);
        const post = readPost('./posts')(postProps);

        expect(post).to.exist;
        expect(post).to.be.a('string');

        expect(post).to.contain(postProps.front_matter.title);
        expect(post).to.contain(postProps.front_matter.description);
        expect(post).to.contain(postProps.content);

        done();
      })
      .catch(err => {
        done(err);
      });
  });

  it('should not write any .md files if posts arg is empty', done => {
    generate('./test-dir-empty')()
      .then(() => {
        expect(dirExists('./test-dir-empty')).to.be.false;
        done();
      })
      .catch(err => {
        done(err);
      });
  });

  it('should output .md file from a post', done => {
    generate(dir)(posts)
      .then(() => {
        const postProps = mapDataToProps(posts[0]);
        const post = readPost(dir)(postProps);

        expect(post).to.exist;
        expect(post).to.be.a('string');

        expect(post).to.contain(postProps.front_matter.title);
        expect(post).to.contain(postProps.front_matter.description);
        expect(post).to.contain(postProps.content);

        done();
      })
      .catch(err => {
        done(err);
      });
  });

  it('should overwrite existing .md post', done => {
    generate(dir)(posts)
      .then(() => {
        // Regenerate, but with new post
        const newTitle = 'NEWTITLE. OMG!!!';
        const newPost = Object.assign({}, data, {
          html_title: newTitle,
        });

        generate(dir)([newPost])
          .then(postData => {
            const postProps = mapDataToProps(newPost);
            const post = readPost(dir)(postProps);

            expect(post).to.exist;
            expect(post).to.be.a('string');

            expect(post).to.contain(postProps.front_matter.title);
            expect(post).to.contain(postProps.front_matter.description);
            expect(post).to.contain(postProps.content);
            expect(post).to.contain(newTitle);

            done();
          })
          .catch(err => {
            done(err);
          });
      })
      .catch(err => {
        done(err);
      });
  });
});
