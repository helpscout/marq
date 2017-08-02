import { readPost, dirExists } from './helpers';
import generate from '../src/generate';
import mapDataToProps from '../src/mapDataToProps';
import data from './fixture/post';
import customTemplate from './template/custom-post';

const posts = [data];
const options = {
  dest: './test-dir',
};

describe('generate', () => {
  it("should return false if dir argument isn't valid", () => {
    const badOptions = {
      dest: '',
      template: 123,
    };

    expect(generate(123)(posts)).to.be.false;
    expect(generate(badOptions)(posts)).to.be.false;
  });

  it('should resolve promise if posts are valid', () => {
    expect(generate(options)(posts)).to.be.fulfilled;
  });

  it('should output .md file into default dir', done => {
    generate()(posts)
      .then(() => {
        const postProps = mapDataToProps(posts[0]);
        const post = readPost('./posts')(postProps);

        expect(post).to.exist;
        expect(post).to.be.a('string');

        expect(post).to.contain(postProps.marq.front_matter.title);
        expect(post).to.contain(postProps.marq.front_matter.description);
        expect(post).to.contain(postProps.marq.content);

        done();
      })
      .catch(err => {
        done(err);
      });
  });

  it('should output .md file into custom dir', done => {
    const customOptions = {
      dest: './test-dir/super/deep/custom/dir',
      template: customTemplate,
    };
    generate(customOptions)(posts)
      .then(() => {
        const postProps = mapDataToProps(posts[0]);
        const post = readPost(customOptions.dest)(postProps);

        expect(post).to.exist;
        expect(post).to.be.a('string');

        expect(post).to.contain(postProps.marq.front_matter.title);
        expect(post).to.contain(postProps.marq.front_matter.description);
        expect(post).to.contain(postProps.marq.content);
        expect(post).to.contain('custom');

        done();
      })
      .catch(err => {
        done(err);
      });
  });

  it('should not write any .md files if posts arg is empty', done => {
    const customOptions = {
      dest: './test-dir-empty',
      template: './template/post.js',
    };
    generate(customOptions)()
      .then(() => {
        expect(dirExists(customOptions.dest)).to.be.false;
        done();
      })
      .catch(err => {
        done(err);
      });
  });

  it('should output .md file from a post', done => {
    generate(options)(posts)
      .then(() => {
        const postProps = mapDataToProps(posts[0]);
        const post = readPost(options.dest)(postProps);

        expect(post).to.exist;
        expect(post).to.be.a('string');

        expect(post).to.contain(postProps.marq.front_matter.title);
        expect(post).to.contain(postProps.marq.front_matter.description);
        expect(post).to.contain(postProps.marq.content);

        done();
      })
      .catch(err => {
        done(err);
      });
  });

  it('should overwrite existing .md post', done => {
    generate(options)(posts)
      .then(() => {
        // Regenerate, but with new post
        const newTitle = 'NEWTITLE. OMG!!!';
        const newPost = Object.assign({}, data, {
          html_title: newTitle,
          slug: 'new-slug',
        });

        generate(options)([newPost])
          .then(() => {
            const postProps = mapDataToProps(newPost);
            const post = readPost(options.dest)(postProps);

            expect(post).to.exist;
            expect(post).to.be.a('string');

            expect(post).to.contain(postProps.marq.front_matter.title);
            expect(post).to.contain(postProps.marq.front_matter.description);
            expect(post).to.contain(postProps.marq.content);
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

  it('should error out if post is invalid', done => {
    generate(options)([{ bad: true }]).then(err => {
      expect(err).to.contain('marq');
      done();
    });
  });
});
