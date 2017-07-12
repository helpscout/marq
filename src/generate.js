import { isString } from 'lodash';
import savePost from './savePost';

const defaultDir = './posts';

export const generate = (dir = defaultDir) => (posts = []) => {
  if (!isString(dir)) return false;
  const saveQueue = [];

  posts.forEach(post => {
    saveQueue.push(savePost(dir)(post));
  });

  return Promise.all(saveQueue);
};

export default generate;
