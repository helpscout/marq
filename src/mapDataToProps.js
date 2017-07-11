import { getDate, getFileName, sanitize, slugify } from './utils';

// Data comes from Hubspot's V2 Blog API
// https://developers.hubspot.com/docs/methods/blogv2/get_blogs_blog_id

const mapDataToProps = data => {
  const publishDate = getDate(data.publish_date);
  const slug = slugify(data.slug);
  const title = data.html_title;
  const description = data.meta_description;

  return {
    id: data.id,
    date: publishDate,
    author: {
      id: data.author_user_id,
      username: data.author_username,
      name: data.author_name,
    },
    content: data.post_body,
    fileName: getFileName(publishDate, slug),
    title,
    description,
    slug,
    front_matter: {
      title: sanitize(title),
      description: sanitize(description),
    },
  };
};

export default mapDataToProps;
