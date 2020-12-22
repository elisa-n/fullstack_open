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

  return(
    <div style={blogStyle}>
      {blog.title} {blog.author}
      <button style={buttonStyle} onClick={toggleVisibility}>{visible ? 'hide' : 'show'}</button>
      <div style={showWhenVisible}>
        {blog.url} <br />
          likes: {blog.likes} <button style={buttonStyle} onClick={() => likeBlog(blog)}>like</button><br />
        {blog.user.name} <br />
        <button style={removeStyle} onClick={() => handleRemoveBlog(blog)}>remove</button>
      </div>
    </div>
  )
}

Blog.PropTypes = {
  removeBlog: PropTypes.func.isRequired,
  likeBlog: PropTypes.func.isRequired,
  blog: PropTypes.object.isRequired
}

export default Blog