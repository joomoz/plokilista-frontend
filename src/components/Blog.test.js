import React from 'react'
import { shallow } from 'enzyme'
import Blog from './Blog'

describe.only('Blog', () => {
  let blogComponent
  const mockHandler = jest.fn()

  const blog = {
    title: 'this is title',
    author: 'this is author',
    url: 'www.address.com',
    likes: 99,
    user: {
      name: 'joonas',
      username: 'joo'
    }
  }

  const user = {
    name: "joonas",
    username: "joo"
  }
  
  beforeEach(() => {
    blogComponent = shallow(<Blog blog={blog} user={user} onClick={mockHandler}/>)
  })

  it('normally shows only title and author', () => {
    const contentDiv = blogComponent.find('.content')

    expect(contentDiv.text()).toContain(blog.title)
    expect(contentDiv.text()).toContain(blog.author)
  })

  it('after clicking shows also likes and url', () => {
    const titleDiv = blogComponent.find('.titleDiv')
    titleDiv.simulate('click')

    const contentDiv = blogComponent.find('.content')

    expect(contentDiv.text()).toContain(blog.url)
    expect(contentDiv.text()).toContain(blog.likes)
  })

})