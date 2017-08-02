import fetch from 'node-fetch';
import getEndpointUrl from './utils/getEndpointUrl';
import { isObject, isString } from 'lodash';

const endpoints = {
  hubspot: 'https://api.hubapi.com/content/api/v2/blog-posts',
};

const getPosts = params => {
  /* istanbul ignore next */
  // Skipping the coverage test of node-fetch
  return new Promise((resolve, reject) => {
    if (!isObject(params)) {
      reject("Marq requires an object for it's options");
    }
    if (!params.hapikey || !params.content_group_id) {
      reject("Hmm… Something's not right with your Hubspot credentials.");
    }

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
    if (!url || !isString(url)) {
      reject("Hmm… Something's not right with your Hubspot credentials.");
    }

    fetch(url)
      .then(res => {
        if (res.status !== 200) {
          reject("Hmm… Something's not right with your Hubspot credentials.");
        }
        return res.json();
      })
      .then(results => resolve(results.objects))
      .catch(err => reject(err));
  });
};

export default getPosts;
