import fetch from 'node-fetch';
import getEndpointUrl from './utils/getEndpointUrl';

const endpoints = {
  hubspot: 'https://api.hubapi.com/content/api/v2/blog-posts',
};

const getPosts = params => {
  const url = getEndpointUrl(endpoints.hubspot, params);
  /* istanbul ignore next */
  // Test exists for this return. However, it's reporting incomplete since the
  // else condition is being skipped.
  if (!url) return false;

  /* istanbul ignore next */
  // Skipping the coverage test of node-fetch
  return new Promise((resolve, reject) => {
    fetch(url)
      .then(res => res.json())
      .then(results => resolve(results.objects))
      .catch(err => reject(err));
  });
};

export default getPosts;
