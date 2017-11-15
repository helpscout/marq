import marq from '../src/index'

// Demo keys
// https://developers.hubspot.com/docs/methods/blogv2/get_blog_posts
const stubQuery = {
  key: 'demo',
  blogId: '351076'
}

describe('marq', () => {
  it('should return false if argument is invalid', () => {
    expect(marq()).to.be.false
    expect(marq(() => {})).to.be.false
    expect(marq([])).to.be.false
    expect(marq(true)).to.be.false
  })

  it('should fetch from Hubspot with correct options', () => {
    const options = {
      hubspot: stubQuery,
      logWhenComplete: false
    }
    expect(marq(options)).to.be.fulfilled
  })

  it('should fire beforeGenerate', () => {
    let stub = false
    const options = {
      hubspot: stubQuery,
      logWhenComplete: false,
      beforeGenerate: posts => {
        stub = posts
        return posts
      }
    }
    marq(options)

    expect(stub).to.not.be.an('array')
  })
})
