import { getDate, getFileName, slugify } from './utils';

// Data comes from Hubspot's V2 Blog API
// https://developers.hubspot.com/docs/methods/blogv2/get_blogs_blog_id

const mapDataToProps = data => {
  const publishDate = getDate(data.publish_date);
  const slug = slugify(data.slug);

  return {
    id: data.id,
    title: data.html_title,
    date: publishDate,
    author: {
      id: data.author_user_id,
      username: data.author_username,
      name: data.author_name,
    },
    description: data.meta_description,
    content: data.post_body,
    slug: slug,
    fileName: getFileName(publishDate, slug),
  };
};

export default mapDataToProps;
