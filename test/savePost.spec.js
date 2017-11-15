import { readPost } from './helpers'
import savePost from '../src/savePost'
import mapDataToProps from '../src/mapDataToProps'
import data from './fixture/post'

const options = {
  dest: './test-dir',
  template: './template/post.js'
}

describe('savePost', () => {
  it("should be rejected if dir argument isn't valid", () => {
    expect(savePost(123)(data)).to.be.rejected
  })

  it('should be rejected if post is invalid', () => {
    expect(savePost(options)({})).to.be.rejected
    expect(savePost(options)()).to.be.rejected
    expect(savePost(options)('postttttttttt')).to.be.rejected
  })

  it('should be rejected if options is invalid', () => {
    const badOptions = {
      dest: options.dest,
      template: 123
    }
    expect(savePost(badOptions)(data)).to.be.rejected
  })

  it('should resolve promise if post is valid', () => {
    expect(savePost(options)(data)).to.be.fulfilled
  })

  it('should output .md file into default dir', done => {
    savePost()(data)
      .then(() => {
        const postProps = mapDataToProps(data)
        const post = readPost('./posts')(postProps)

        expect(post).to.exist
        expect(post).to.be.a('string')

        expect(post).to.contain(postProps.marq.front_matter.title)
        expect(post).to.contain(postProps.marq.front_matter.description)
        expect(post).to.contain(postProps.marq.content)

        done()
      })
      .catch(err => {
        done(err)
      })
  })

  it('should output .md file into dir, with a dest() function', done => {
    const options = {
      dest: () => './test-dir',
      template: './template/post.js'
    }
    savePost(options)(data)
      .then(() => {
        const postProps = mapDataToProps(data)
        const post = readPost('./posts')(postProps)

        expect(post).to.exist
        expect(post).to.be.a('string')

        expect(post).to.contain(postProps.marq.front_matter.title)
        expect(post).to.contain(postProps.marq.front_matter.description)
        expect(post).to.contain(postProps.marq.content)

        done()
      })
      .catch(err => {
        done(err)
      })
  })

  it('should remap post data if callback fn is defined', () => {
    const remapPostData = data => {
      return Object.assign({}, data, {
        customData: true
      })
    }

    expect(savePost(options)(data, remapPostData)).to.eventually.have.property(
      'customData'
    )
  })
})
