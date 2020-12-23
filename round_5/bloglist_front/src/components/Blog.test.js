import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

test('renders blog title and author but nothing else', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Full Stack Open',
    likes: 4,
    url: 'www.test.fi',
    user: {
      name: 'test-guy'
    }
  }

  let likeBlog = jest.fn()
  let removeBlog = jest.fn()

  let component = render(
    <Blog blog={blog} likeBlog={likeBlog} removeBlog={removeBlog} />
  )

  const blogPost = component.container
  expect(blogPost).toHaveTextContent('Component testing is done with react-testing-library')
  expect(blogPost).toHaveTextContent('Full Stack Open')
  expect(blogPost).not.toHaveTextContent('likes')
  expect(blogPost).not.toHaveTextContent('www.test.fi')
})

test('renders rest of blog info after pressing the button', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Full Stack Open',
    likes: 4,
    url: 'www.test.fi',
    user: {
      name: 'test-guy'
    }
  }

  let likeBlog = jest.fn()
  let removeBlog = jest.fn()

  let component = render(
    <Blog blog={blog} likeBlog={likeBlog} removeBlog={removeBlog} />
  )

  const blogPost = component.container
  const button = blogPost.querySelector('.visibilityButton')
  fireEvent.click(button)
  expect(blogPost).toHaveTextContent('likes')
  expect(blogPost).toHaveTextContent('www.test.fi')
})

test('if the like button is pressed twice, calls the eventHandler twice', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Full Stack Open',
    likes: 4,
    url: 'www.test.fi',
    user: {
      name: 'test-guy'
    }
  }

  let likeBlog = jest.fn()
  let removeBlog = jest.fn()

  let component = render(
    <Blog blog={blog} likeBlog={likeBlog} removeBlog={removeBlog} />
  )

  const blogPost = component.container
  const visibilityButton = blogPost.querySelector('.visibilityButton')

  fireEvent.click(visibilityButton)

  const likeButton = blogPost.querySelector('.likeButton')

  fireEvent.click(likeButton)
  fireEvent.click(likeButton)
  expect(likeBlog.mock.calls).toHaveLength(2)

})
