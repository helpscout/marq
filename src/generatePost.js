import { isString, template } from 'lodash';
import defaultPostTemplate from './template/post';

const generatePost = (postTemplate = defaultPostTemplate) => {
  if (!isString(postTemplate)) return false;

  return data => {
    return template(postTemplate)(data);
  };
};

export default generatePost;
