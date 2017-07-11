import mkdir from 'mkdir';
import generatePost from './generatePost';
import mapDataToProps from './mapDataToProps';

const defaultDir = './posts';

export const writeFiles = (dir = defaultDir) => (posts = []) => {
  posts.forEach(p => {
    const fileName = p.props.fileName;
    const fileContent = p.fileContent;

    fs.writeFileSync(`${dir}/${fileName}`, fileContent);
  });
};

const generate = (dir = defaultDir) => (posts = []) => {
  const postFiles = posts.map(d => {
    const props = mapDataToProps(d);
    const fileContent = generate(posts);
    return {
      fileContent,
      props,
    };
  });

  writeFiles(dir)(postFiles);
};

export default generate;
