import { isString, template } from 'lodash';
import defaultPostTemplate from './template/post';

const generatePost = (postTemplate = defaultPostTemplate) => {
  return data => {
    if (!isString(postTemplate)) return false;

    return template(postTemplate)(data);
  };
};

export default generatePost;
