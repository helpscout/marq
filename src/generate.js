import fs from 'fs';
import mkdir from 'mkdirp';
import generatePost from './generatePost';
import mapDataToProps from './mapDataToProps';
import { isValidPost } from './utils';

const defaultDir = './posts';

export const savePost = (dir = defaultDir) => postData => {
  if (!postData) return false;

  const { content, fileName } = postData;
  const filePath = `${dir}/${fileName}`;

  return new Promise((resolve, reject) => {
    mkdir(dir, err => {
      if (err && reject) return reject(err);
      fs.writeFileSync(filePath, content);
      resolve(filePath);
    });
  });
};

export const generate = (dir = defaultDir) => (posts = []) => {
  const saveQueue = [];

  posts.forEach(post => {
    const props = mapDataToProps(post);
    if (!isValidPost(props)) return;

    const content = generatePost(props);
    const postData = {
      fileName: props.fileName,
      content,
    };

    saveQueue.push(savePost(dir)(postData));
  });

  return Promise.all(saveQueue);
};

export default generate;
