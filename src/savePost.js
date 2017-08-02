import fs from 'fs';
import mkdir from 'mkdirp';
import { isObject, isString } from 'lodash';
import generatePost from './generatePost';
import mapDataToProps from './mapDataToProps';
import { isValidPost } from './utils';
import template from './template/post.js';

const defaultOptions = {
  dest: './posts',
  template: template,
};

const savePost = (options = defaultOptions) => post => {
  if (!isObject(options)) return false;
  if (!isValidPost(post)) return false;

  const config = Object.assign({}, defaultOptions, options);
  const dest = config.dest;
  const template = config.template;

  if (!isString(dest) || !isString(template)) return false;

  const props = mapDataToProps(post);
  const markdown = generatePost(template)(props);
  const filePath = `${dest}/${props.fileName}`;

  return new Promise((resolve, reject) => {
    mkdir(dest, err => {
      /* istanbul ignore next */
      // skipping testing for mkdir's promise reject
      if (err) return reject(err);
      fs.writeFile(filePath, markdown, err => {
        /* istanbul ignore next */
        // skipping testing for writeFile's promise reject
        if (err) return reject(err);
        resolve(props);
      });
    });
  });
};

export default savePost;
