import { isObject, isNumber, isString } from 'lodash';

const isValidPost = (post = {}) => {
  const { html_title, meta_description, post_body, publish_date, slug } = post;

  return (
    isObject(post) &&
    isString(html_title) &&
    isString(meta_description) &&
    isString(post_body) &&
    isNumber(publish_date) &&
    isString(slug)
  );
};

export default isValidPost;
