import { isString } from 'lodash';
import slugify from './slugify';

const getFileName = (date, slug) => {
  if (!isString(date) || !isString(slug)) return false;

  const file = slugify(slug.replace('blog/', ''));
  return `${date}-${file}.md`;
};

export default getFileName;
