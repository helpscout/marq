import fs from 'fs';
import mkdir from 'mkdirp';
import { isString } from 'lodash';
import generatePost from './generatePost';
import mapDataToProps from './mapDataToProps';
import { isValidPost } from './utils';

const defaultDir = './posts';

const savePost = (dir = defaultDir) => post => {
  if (!isString(dir)) return false;
  if (!isValidPost(post)) return false;

  const props = mapDataToProps(post);
  const markdown = generatePost(props);
  const filePath = `${dir}/${props.fileName}`;

  return new Promise((resolve, reject) => {
    mkdir(dir, err => {
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
