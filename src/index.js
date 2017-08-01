import generate from './generate';
import getPosts from './getPosts';

const defaultOptions = {};

const marq = (options = defaultOptions) => {
  // Todo: Actually parse options into arguments for the functions below
  getPosts(options).then(posts => {
    generate()(posts).then(r =>
      console.log(`marq generated ${r.length} posts into ./posts`)
    );
  });
};

export default marq;

module.exports = marq;
// For ES2015 default import
module.exports.default = marq;
