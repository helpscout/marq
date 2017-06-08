const fs = require('fs');
const template = require('lodash.template')
const data = require('./data/blog-posts.json')
const postTemplate = require('./template')


const slugify = (string) => {
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start of text
    .replace(/-+$/, '');            // Trim - from end of text
}

const getDate = (date) => {
  return new Date(date).toISOString().substring(0, 10)
}

const getFileName = (date, slug) => {
  const file = slug.replace('blog/', '')
  return `${date}-${file}.md`
}

const mapDataToProps = (data) => {
  return {
    id: data.id,
    title: data.html_title,
    date: getDate(data.publish_date),
    author: {
      id: data.author_user_id,
      username: data.author_username,
      name: data.author_name,
    },
    description: data.meta_description,
    content: data.post_body,
    slug: data.slug,
    fileName: getFileName(getDate(data.publish_date), data.slug),
  }
}

const getData = () => {
  return data.objects
}

const generatePost = (data) => {
  return template(postTemplate)(data)
}

const generatePosts = (data) => {
  return data.map(d => {
    const props = mapDataToProps(d)
    return {
      props: props,
      fileContent: generatePost(props),
    }
  })
};

const h2jk = () => {
  return generatePosts(getData())
}

const posts = h2jk()

console.log('')
console.log('Ready for some magic, Nick?')
console.log('**squeee**')
console.log('')
posts.forEach(p => {
  const fileName = p.props.fileName
  const fileContent = p.fileContent

  fs.writeFileSync(`./posts/${fileName}`, fileContent)
  console.log(`./posts/${fileName} created with h2jk!`)
})
console.log('')
console.log('OH BOY')
console.log('')

module.export = h2jk
module.export.default = h2jk
