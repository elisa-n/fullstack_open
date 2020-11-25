
const _ = require('lodash')

const dummy = () => {
  return 1
}

const totalLikes = (blogs) => {
  let likes = blogs.map(blog => { return blog.likes})

  let reducer = (sum, likes) => {
    return sum + likes
  }

  let total = likes.reduce(reducer, 0)
  return total

}

const favoriteBlog = (blogs) => {
  let reducer = (fave, blog) => {
    return fave.likes >= blog.likes ? fave : blog
  }

  let fave = blogs.reduce(reducer, blogs[0])

  return {
    title: fave.title,
    author: fave.author,
    likes: fave.likes
  }
}

const mostBlogs = (blogs) => {
  const authors = _.countBy(blogs, 'author')
  const keys = _.keys(authors)

  let reducer = (authorWithMost, author) => {
    return authors[authorWithMost] >= authors[author] ? authorWithMost : author
  }

  let most = keys.reduce(reducer, keys[0])

  return {
    author: most,
    blogs: authors[most]
  }
}

const mostLikes = (blogs) => {

  const authors = _(blogs)
    .groupBy('author')
    .map((blogs, author) => ({
      author: author,
      likes: _.sumBy(blogs, 'likes')
    }))
    .value()

  const mostLiked = _.maxBy(authors, 'likes')

  return mostLiked
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}