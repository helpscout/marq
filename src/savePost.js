import fs from 'fs'
import mkdir from 'mkdirp'
import { isFunction, isObject, isString } from 'lodash'
import generatePost from './generatePost'
import mapDataToProps from './mapDataToProps'
import { isValidPost } from './utils'
import template from './template/post.js'

const defaultOptions = {
  dest: './posts',
  template: template
}

const savePost = (options = defaultOptions) => (post, remapPostData) => {
  return new Promise((resolve, reject) => {
    if (!isObject(options)) {
      reject('marq: Options needs to be an object')
    }
    if (!isValidPost(post)) {
      reject("marq: Hmm… This post doesn't appear to be correct.")
    }

    const config = Object.assign({}, defaultOptions, options)
    const dest = config.dest
    const template = config.template

    if (!isString(dest) || !isString(template)) {
      reject("marq: Hmm… Looks like something's up with the configuration.")
    }

    let props = mapDataToProps(post)
    if (remapPostData && isFunction(remapPostData)) {
      props = remapPostData(props)
    }

    const markdown = generatePost(template)(props)
    const filePath = `${dest}/${props.marq.fileName}`
    mkdir(dest, err => {
      /* istanbul ignore next */
      // skipping testing for mkdir's promise reject
      if (err) return reject(err)
      fs.writeFile(filePath, markdown, err => {
        /* istanbul ignore next */
        // skipping testing for writeFile's promise reject
        if (err) return reject(err)
        resolve(props)
      })
    })
  })
}

export default savePost
