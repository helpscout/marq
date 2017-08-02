import { isObject, isString } from 'lodash';
import savePost from './savePost';
import template from './template/post.js';

const defaultOptions = {
  dest: './posts',
  template: template,
};

export const generate = (options = defaultOptions) => (posts = []) => {
  if (!isObject(options)) return false;

  const config = Object.assign({}, defaultOptions, options);
  const dest = config.dest;
  const template = config.template;

  if (!isString(dest) || !isString(template)) return false;

  const saveQueue = [];

  posts.forEach(post => {
    saveQueue.push(savePost(options)(post));
  });

  return (
    Promise.all(saveQueue)
      /* istanbul ignore next */
      .catch(err => err)
  );
};

export default generate;
