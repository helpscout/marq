import { template } from 'lodash';
import postTemplate from './template/post';

const generatePost = data => {
  return template(postTemplate)(data);
};

export default generatePost;
