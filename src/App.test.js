import React from 'react'
import { mount } from 'enzyme'
import App from './App'
import Blog from './components/Blog'
jest.mock('./services/blogs')
import blogService from './services/blogs'

describe.only('<App />', () => {
  let app
  beforeEach(() => {
    app = mount(<App />)
  })

  describe('when user is not logged', () => {
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

})