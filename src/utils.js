import { isNumber, isString } from 'lodash';

export const getDate = date => {
  if (!isNumber(date)) return false;

  return new Date(date).toISOString().substring(0, 10);
};

export const getFileName = (date, slug) => {
  if (!isString(date) || !isString(slug)) return false;

  const file = slugify(slug.replace('blog/', ''));
  return `${date}-${file}.md`;
};

export const sanitize = text => {
  return text.toString().replace(/\"/g, '"');
};

export const slugify = slug => {
  return slug
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/[^\w\-]+/g, '') // Remove all non-word chars
    .replace(/\-\-+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, ''); // Trim - from end of text
};
