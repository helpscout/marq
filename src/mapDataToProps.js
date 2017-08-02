import { getDate, getFileName, isValidPost, sanitize, slugify } from './utils';

// Data comes from Hubspot's V2 Blog API
// https://developers.hubspot.com/docs/methods/blogv2/get_blogs_blog_id

const mapDataToProps = data => {
  if (!isValidPost(data)) return false;

  const publishDate = getDate(data.publish_date);
  const slug = slugify(data.slug.replace('blog/', ''));
  const title = data.html_title;
  const description = data.meta_description;

  const featuredImage = data.featured_image
    ? {
        src: data.featured_image,
        alt: data.featured_image_alt_text,
        height: data.featured_image_height,
        width: data.featured_image_width,
      }
    : null;

  const marqData = {
    id: data.id,
    date: publishDate,
    content: data.post_body,
    fileName: getFileName(publishDate, slug),
    featuredImage,
    title,
    description,
    slug,
    front_matter: {
      title: sanitize(title),
      description: sanitize(description),
    },
  };

  data.marq = marqData;

  return data;
};

export default mapDataToProps;
