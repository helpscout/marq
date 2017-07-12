import fs from 'fs';
import mkdir from 'mkdirp';
import generatePost from './generatePost';
import mapDataToProps from './mapDataToProps';
import { isValidPost } from './utils';

const defaultDir = './posts';

export const savePost = (dir = defaultDir) => postData => {
  if (!postData) return false;

  const { markdown, props } = postData;
  const filePath = `${dir}/${props.fileName}`;

  return new Promise((resolve, reject) => {
    mkdir(dir, err => {
      if (err && reject) return reject(err);
      fs.writeFileSync(filePath, markdown);
      resolve(props);
    });
  });
};

export const generate = (dir = defaultDir) => (posts = []) => {
  const saveQueue = [];

  posts.forEach(post => {
    const props = mapDataToProps(post);
    if (!isValidPost(props)) return;

    const markdown = generatePost(props);
    const postData = {
      props,
      markdown,
    };

    saveQueue.push(savePost(dir)(postData));
  });

  return Promise.all(saveQueue);
};

export default generate;
