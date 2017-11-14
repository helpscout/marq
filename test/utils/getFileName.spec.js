import getFileName from '../../src/utils/getFileName'

describe('getFileName', () => {
  it('should only accept string arguments', () => {
    expect(getFileName(2016, 123)).to.be.false
    expect(getFileName({ date: '2016-10-01', slug: '123' })).to.be.false
  })

  it('should transform date + slug into an .md file name', () => {
    const fileName = getFileName('2011-01-01', '/blog/hello/')

    expect(fileName).to.equal('2011-01-01-hello.md')
  })
})
