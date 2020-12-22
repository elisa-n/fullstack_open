import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import ErrorNotification from './components/ErrorNotification'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login' 

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [notification, setNotification] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs => {
      blogs.sort((a, b) => (a.likes < b.likes ? 1 : -1))
      setBlogs( blogs )
    })  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
      })
    setNotification(`a new blog ${blogObject.title} by ${blogObject.author} added`)
    setTimeout(() => setNotification(null), 5000)
  }

  const removeBlog = (blogObject) => {
    blogService
      .remove(blogObject)
      .then(res => {
        setBlogs(blogs.filter(blog => blog !== blogObject))
      })
      .then(() => {
        setNotification(`the blog ${blogObject.title} was removed`)
        setTimeout(() => setNotification(null), 5000)})
      .catch(e => {
        setErrorMessage(e.message)
        setTimeout(() => setErrorMessage(null), 5000)})
  }

    const addLike = (blogObject) => {
      const newLikes = blogObject.likes + 1
      const newBlogObject = {
        ...blogObject, likes: newLikes}
      
      blogService
        .update(newBlogObject.id, newBlogObject)
        .then(res => {
          const updatedBlogs = blogs.map((blog) =>
            blog.id === blogObject.id ? {...blog, likes: newLikes} : blog )
          updatedBlogs.sort((a, b) => (a.likes < b.likes ? 1 : -1))
          setBlogs(updatedBlogs)
        })
        .then(res => {
          setNotification(`Liked the blog ${blogObject.title}`)
          setTimeout(() => setNotification(null), 5000)})
        .catch(e => {
          setErrorMessage(e.message)
          setTimeout(() => setErrorMessage(null), 5000)})
    }


  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password
      })
      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      ) 
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('wrong username or password')
      setTimeout(() => setErrorMessage(null), 5000)
    }
    console.log('logging in with', username, password)
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogAppUser')
    setUser(null)
  }

  const loginForm = () => {
    return (
      <div>
        <Togglable buttonLabel='login'>
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
        </Togglable>
      </div>
    )
  }

  const logoutForm = () => (
    <form onSubmit={handleLogout}>
      <button type='submit'>logout</button>
    </form>
  )

  const blogForm = () => {
    return(
      <div>
        <Togglable buttonLabel='new note' ref={blogFormRef}>
          <BlogForm 
            createBlog={addBlog} />
        </Togglable>
      </div>
    )  
  }

  return (
    <div>
      <ErrorNotification message={errorMessage} />
      <Notification message={notification} />

      {user === null ?
      <div> 
        {loginForm()} 
      </div>
        :
        <div>
          <h2>Blogs</h2>
          <p>{user.name} logged in</p>
          <div>
            {logoutForm()}
          </div>
          <div>
              {blogForm()}
          </div>
        </div>
        }
      <div>
        {blogs.map(blog =>
          <Blog 
            key={blog.id}
            blog={blog}
            removeBlog={removeBlog}
            likeBlog={addLike}/>
        )}
      </div>
    </div>
  )
}

export default App