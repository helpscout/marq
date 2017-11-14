import remapOptions from '../../src/utils/remapOptions'

describe('utils', () => {
  describe('remapOptions', () => {
    it('should return an empty object if invalid options', () => {
      expect(remapOptions()).to.be.an('object').that.is.empty
      expect(remapOptions('123')).to.be.an('object').that.is.empty
      expect(remapOptions(123)).to.be.an('object').that.is.empty
      expect(remapOptions([{ key: '123' }])).to.be.an('object').that.is.empty

      const semiValidOptions = {
        hubspot: {
          key: '123'
        }
      }

      expect(remapOptions(semiValidOptions)).to.be.an('object').that.is.empty
    })

    it('should remap hubspot configs to query values', () => {
      const options = {
        hubspot: {
          key: 'demo',
          blogId: 'id'
        }
      }

      const config = remapOptions(options)

      expect(config.query.hapikey).to.equal(options.hubspot.key)
      expect(config.query.content_group_id).to.equal(options.hubspot.blogId)
    })

    it('should remap dest value', () => {
      const options = {
        hubspot: {
          key: 'demo',
          blogId: 'id'
        },
        dest: 'src/_posts/'
      }

      const config = remapOptions(options)

      expect(config.dest).to.equal(options.dest)
    })

    it('should have a default dest value', () => {
      const options = {
        hubspot: {
          key: 'demo',
          blogId: 'id'
        }
      }

      const config = remapOptions(options)

      expect(config.dest).to.exist
      expect(config.dest).to.equal('./_posts/')
    })

    it('should remap template value', () => {
      const options = {
        hubspot: {
          key: 'demo',
          blogId: 'id'
        },
        template: 'template.js'
      }

      const config = remapOptions(options)

      expect(config.template).to.exist
      expect(config.template).to.equal(options.template)
    })

    it('should have a default template value', () => {
      const options = {
        hubspot: {
          key: 'demo',
          blogId: 'id'
        }
      }

      const config = remapOptions(options)

      expect(config.template).to.exist
      expect(config.template).to.contain('title')
      expect(config.template).to.contain('front_matter')
    })
  })
})
