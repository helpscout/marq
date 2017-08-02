import generate from './generate';
import getPosts from './getPosts';
import remapOptions from './utils/remapOptions';

const defaultOptions = {};

const marq = (options = defaultOptions) => {
  const config = remapOptions(options);
  // Todo: Actually parse options into arguments for the functions below
  return new Promise((resolve, reject) => {
    getPosts(config.query)
      .then(posts => {
        const o = {
          dest: config.dest,
          template: config.template,
        };
        generate(o)(posts)
          .then(r => {
            console.log(`marq generated ${r.length} posts into ./posts`);
            return resolve(r);
          })
          .catch(err => {
            return reject(err);
          });
      })
      .catch(err => {
        return reject(err);
      });
  });
};

export default marq;
