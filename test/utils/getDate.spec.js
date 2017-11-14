import getDate from '../../src/utils/getDate'

describe('utils', () => {
  describe('getDate', () => {
    it('should transform a timestamp into a YYYY-MM-DD date', () => {
      const timestamp = 1481854349000
      const date = getDate(timestamp)

      expect(date).to.equal('2016-12-16')
    })

    it('should return false if argument is not a number', () => {
      expect(getDate('1481854349000')).to.be.false
      expect(getDate({ date: 1481854349000 })).to.be.false
      expect(getDate([1481854349000])).to.be.false
    })
  })
})
