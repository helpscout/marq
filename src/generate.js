import fs from 'fs';
import mkdir from 'mkdirp';
import generatePost from './generatePost';
import mapDataToProps from './mapDataToProps';
import { isValidPost } from './utils';

const defaultDir = './posts';

export const savePost = (dir = defaultDir) => postData => {
  if (!isValidPost(postData)) return false;

  const { content, fileName } = postData;

  fs.writeFileSync(`${dir}/${fileName}`, content);
};

export const generate = (dir = defaultDir) => (posts = []) => {
  mkdir(dir);

  posts.forEach(post => {
    const props = mapDataToProps(post);
    if (!isValidPost(props)) return;

    const content = generatePost(props);
    const postData = {
      fileName: props.fileName,
      content,
    };

    savePost(dir)(postData);
  });
};

export default generate;
