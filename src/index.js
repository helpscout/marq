import { isPlainObject } from 'lodash'
import generate from './generate'
import getPosts from './getPosts'
import remapOptions from './utils/remapOptions'

const defaultOptions = {
  logWhenComplete: true,
  beforeGenerate: /* istanbul ignore next */ posts => posts,
  remapPostData: /* istanbul ignore next */ props => props
}

const marq = (options) => {
  if (!isPlainObject(options)) return false

  const config = Object.assign({}, defaultOptions, remapOptions(options))
  const {
    beforeGenerate,
    dest,
    query,
    logWhenComplete,
    remapPostData,
    template
  } = config

  return new Promise((resolve, reject) => {
    /* istanbul ignore next */
    // Tested in isolation
    getPosts(query)
      .then(posts => {
        const postData = beforeGenerate(posts)

        generate({ dest, template }, remapPostData)(postData)
          .then(r => {
            if (logWhenComplete) {
              console.log(
                `marq generated ${r.length} posts into ${config.dest}`
              )
            }
            return resolve(r)
          })
          .catch(err => {
            return reject(err)
          })
      })
      .catch(err => {
        return reject(err)
      })
  })
}

export default marq
