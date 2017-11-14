import { isObject, isString } from 'lodash'
import queryString from 'query-string'

const getEndpointUrl = (url, params) => {
  if (!url || !isString(url) || !isObject(params)) return false

  url = url.endsWith('/') ? url : `${url}/`
  const urlParams = queryString.stringify(params)

  return urlParams ? `${url}?${urlParams}` : url
}

export default getEndpointUrl
