import React from 'react'
import { mount } from 'enzyme'
import App from './App'
import Blog from './components/Blog'
jest.mock('./services/blogs')
import blogService from './services/blogs'

describe('<App />', () => {
  
  describe('when user is not logged', () => {
    let app
    beforeEach(() => {
      app = mount(<App />)
    })
    
    it('doesnt show any blogs', () => {
      app.update()
      const blogComponents = app.find(Blog)
      const loginForm = app.find('.loginForm')
      const appDiv = app.find('.appDiv')
      
      expect(blogComponents.length).toEqual(0)
      expect(loginForm.text()).toContain('Login to plokilist app')
      expect(appDiv.text()).not.toEqual(expect.stringContaining('Blogs:'))
    })

  })

  describe('when user is logged in', () => {
    let app
    beforeEach(() => {
      const user = {
        username: 'tester',
        token: '1231231214',
        name: 'Teukka Testaaja'
      }
      
      localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      app = mount(<App />)
    })
    
    it('all blog entries are rendered', () => {
      app.update()
      const appDiv = app.find('.appDiv')
      const blogComponents = app.find(Blog)

      expect(appDiv.text()).toContain('React on helppoa')
      expect(blogComponents.length).toEqual(blogService.blogs.length);
    })
  })

})