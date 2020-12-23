import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, removeBlog, likeBlog }) => {
  const [visible, setVisible] = useState(false)

  const showWhenVisible = { display: visible ? '' : 'none' }

  const blogStyle = {
    padding: 5,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const buttonStyle = {
    margin: 10,
  }

  const removeStyle = {
    margin: 10,
    marginLeft: 0,
    backgroundColor: 'cyan'
  }


  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const handleRemoveBlog = (blog) => {
    if (window.confirm(`Remove blog ${blog.name} by ${blog.author}`)) {
      removeBlog(blog)
    }
  }

  const blogInfo = () => (
    <div style={showWhenVisible} className='blogInfo'>
      {blog.url} <br />
        likes: {blog.likes} <button style={buttonStyle} className='likeButton' onClick={() => likeBlog(blog)}>like</button><br />
      {blog.user.name} <br />
      <button style={removeStyle} onClick={() => handleRemoveBlog(blog)}>remove</button>
    </div>
  )

  return(
    <div style={blogStyle} className='blogPost'>
      {blog.title} {blog.author}
      <button style={buttonStyle} className='visibilityButton' onClick={toggleVisibility}>{visible ? 'hide' : 'show'}</button>
      {visible ? blogInfo() : ''}
    </div>
  )
}

Blog.propTypes = {
  removeBlog: PropTypes.func.isRequired,
  likeBlog: PropTypes.func.isRequired,
  blog: PropTypes.object.isRequired
}

export default Blog