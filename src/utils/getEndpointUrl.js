import { isObject, isString } from 'lodash';
import queryString from 'query-string';

const getEndpointUrl = (url, params) => {
  if (!url || !isString(url) || !isObject(params)) return false;

  const urlParams = queryString.stringify(params);

  return `${url}&${urlParams}`;
};

export default getEndpointUrl;
