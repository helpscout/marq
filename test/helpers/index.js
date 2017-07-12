import fs from 'fs';

export const readPost = dir => post => {
  const filePath = `${dir}/${post.fileName}`;
  return fs.readFileSync(filePath, { encoding: 'utf8' });
};

export const dirExists = dir => {
  return fs.existsSync(dir);
};

export const isDirEmpty = dir => {
  return dirExists(dir) && fs.readdirSync(dir).length === 0;
};
