import fetch from 'node-fetch';
import getEndpointUrl from './utils/getEndpointUrl';
import { isObject, isString } from 'lodash';

const endpoints = {
  hubspot: 'https://api.hubapi.com/content/api/v2/blog-posts',
};

const getPosts = params => {
  if (!isObject(params)) return false;

  const defaultParams = {
    archived: false,
    state: 'PUBLISHED',
  };
  const url = getEndpointUrl(
    endpoints.hubspot,
    Object.assign({}, defaultParams, params)
  );

  /* istanbul ignore next */
  // Test exists for this return. However, it's reporting incomplete since the
  // else condition is being skipped.
  if (!url || !isString(url)) return false;

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
