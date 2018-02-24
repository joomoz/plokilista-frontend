import React from 'react'
import { shallow } from 'enzyme'
import SimpleBlog from './SimpleBlog'

describe.only('<SimpleBlog />', () => {
  let blogComponent
  const mockHandler = jest.fn()

  const blog = {
    title: 'this is title',
    author: 'this is author',
    url: 'www.address.com',
    likes: 99
  }
  
  beforeEach(() => {
    blogComponent = shallow(<SimpleBlog blog={blog} onClick={mockHandler}/>)
  })

  it('renders title, author and likes', () => {
    const contentDiv = blogComponent.find('.content')

    expect(contentDiv.text()).toContain(blog.title)
    expect(contentDiv.text()).toContain(blog.author)
    expect(contentDiv.text()).toContain(blog.likes)
  })

  it('two clicks on the button calls event handler twice', () => {
    const button = blogComponent.find('button')
    
    button.simulate('click')
    button.simulate('click')

    expect(mockHandler.mock.calls.length).toBe(2)
  })
})