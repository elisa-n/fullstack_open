import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import ErrorNotification from './components/ErrorNotification'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login' 

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newBlogTitle, setNewBlogTitle] = useState('')
  const [newBlogAuthor, setNewBlogAuthor] = useState('')
  const [newBlogUrl, setNewBlogUrl] = useState('')
  const [notification, setNotification] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const addBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      title: newBlogTitle,
      author: newBlogAuthor,
      url: newBlogUrl,
    }
  
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setNewBlogTitle('')
        setNewBlogAuthor('')
        setNewBlogUrl('')
      })

    setNotification(`a new blog ${newBlogTitle} by ${newBlogAuthor} added`)
    setTimeout(() => setNotification(null), 5000)
  }

  const handleBlogTitleChange = (event) => {
    setNewBlogTitle(event.target.value)
  }

  const handleBlogAuthorChange = (event) => {
    setNewBlogAuthor(event.target.value)
  }

  const handleBlogUrlChange = (event) => {
    setNewBlogUrl(event.target.value)
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

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <p><button type="submit">login</button></p>
    </form>      
  )

  const logoutForm = () => (
    <form onSubmit={handleLogout}>
      <button type='submit'>logout</button>
    </form>
  )

  const blogForm = () => (
    <form onSubmit={addBlog}>
      <div>
        title: 
        <input
          value={newBlogTitle}
          onChange={handleBlogTitleChange}
        />
      </div>
      <div>
        author: 
        <input
          value={newBlogAuthor}
          onChange={handleBlogAuthorChange}
        />
      </div>
      <div>
        url: 
        <input
          value={newBlogUrl}
          onChange={handleBlogUrlChange}
        />
      </div>
      <p><button type="submit">create</button></p>
    </form>  
  )

  return (
    <div>
      <ErrorNotification message={errorMessage} />
      <Notification message={notification} />

      {user === null ?
      <div> 
        <h2>Login</h2>
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
            <h2>Create new blog</h2>
              {blogForm()}
          </div>
        </div>
        }

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App