import { has, isObject } from 'lodash'
import defaultTemplate from '../template/post'

const remapOptions = (options = {}) => {
  let output = {}
  if (!isObject(options)) return output
  if (!has(options, 'hubspot')) return output

  const { hubspot, dest, template, ...rest } = options

  const hapikey = hubspot.key
  const content_group_id = hubspot.blogId

  if (!hapikey || !content_group_id) return output

  output = {
    query: {
      hapikey,
      content_group_id
    },
    dest: dest ? dest : './_posts/',
    template: template ? template : defaultTemplate
  }

  return Object.assign({}, output, rest)
}

export default remapOptions
