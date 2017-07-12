import fs from 'fs';

export const readPost = dir => post => {
  const filePath = `${dir}/${post.fileName}`;
  return fs.readFileSync(filePath, { encoding: 'utf8' });
};
