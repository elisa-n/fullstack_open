import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'

test('<BlogForm /> calls parents with correct information', () => {
  const createBlog = jest.fn()

  const component = render(
    <BlogForm createBlog={createBlog} />
  )

  const form = component.container.querySelector('#blogForm')
  const title = component.container.querySelector('#title')
  const author = component.container.querySelector('#author')
  const url = component.container.querySelector('#url')

  fireEvent.change(title, {
    target: { value: 'Testing of forms could be easier' } })

  fireEvent.change(author, {
    target: { value: 'Elisa' } })

  fireEvent.change(url, {
    target: { value: 'www.test.fi' } })

  fireEvent.submit(form)

  expect(createBlog.mock.calls).toHaveLength(1)

  expect(createBlog.mock.calls[0][0].title).toBe('Testing of forms could be easier')
  expect(createBlog.mock.calls[0][0].author).toBe('Elisa')
  expect(createBlog.mock.calls[0][0].url).toBe('www.test.fi')
})