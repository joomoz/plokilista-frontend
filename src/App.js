import React from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import CreateBlog from './components/CreateBlog'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      error: null,
      blogs: [],
      password: '',
      user: null,
      username: ''
    }
  }

  async componentDidMount() {
    this.refreshBlogs()

    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      this.setState({user})
      blogService.setToken(user.token)
    }
  } 

  refreshBlogs = async () => {
    let blogs = await blogService.getAll()
    blogs.sort((a, b) => (a.likes > b.likes ? -1 : 1))
		this.setState({blogs})
	}

  login = async (event) => {
    event.preventDefault()
    try{
      const user = await loginService.login({
        username: this.state.username,
        password: this.state.password
      })
  
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      this.setState({ username: '', password: '', user})
    } catch(exception) {
      this.setState({
        error: 'username or password incorrect',
      })
      setTimeout(() => {
        this.setState({ error: null })
      }, 5000)
    }
  }

  logout = async (event) => {
    event.preventDefault()
    const user = null

    window.localStorage.removeItem('loggedBlogappUser')
    blogService.setToken("")
    this.setState({ username: '', password: '', user })
  }

  handleLoginFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  createBlog = async (blog) => {
    try{
      const newBlog = await blogService.create(blog)
      this.refreshBlogs()
      this.setState({
        error: `a new blog entry ${newBlog.title} created`
      })
      setTimeout(() => {
        this.setState({ error: null })
      }, 5000)
    } catch(exception) {
      this.setState({
        error: 'unable to create new blog entry',
      })
      setTimeout(() => {
        this.setState({ error: null })
      }, 5000)
    }
  }

  likeBlog = async (blog) => {
    try{
      const likedBlog = await blogService.update(blog)
      this.refreshBlogs()
      this.setState({
        error: `"${likedBlog.title}" liked`
      })
      setTimeout(() => {
        this.setState({ error: null })
      }, 5000)
    } catch(exception) {
      this.setState({
        error: 'unable to add like',
      })
      setTimeout(() => {
        this.setState({ error: null })
      }, 5000)
    }
  }

  deleteBlog = async (blog) => {
    try{
      const removedBlog = await blogService.remove(blog)
      console.log("blog deleted")
      this.refreshBlogs()
      this.setState({
        error: `${removedBlog.title} removed`
      })
      setTimeout(() => {
        this.setState({ error: null })
      }, 5000)
    } catch(exception) {
      this.setState({
        error: 'unable to remove blog',
      })
      setTimeout(() => {
        this.setState({ error: null })
      }, 5000)
    }
  }

  render() {
    const loginForm = () => (
      <div className="loginForm">
        <h2>Login to plokilist app</h2>
        <form onSubmit={this.login}>
          <div>
            username
            <input
              type="text"
              name="username"
              value={this.state.username}
              onChange={this.handleLoginFieldChange}
            />
          </div>
          <div>
            password
            <input
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.handleLoginFieldChange}
            />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    )

    return (
      <div className="appDiv">
        <h1>Plokilist frontend</h1>
        <Notification message={this.state.error} />

        {this.state.user === null ?
          loginForm() :
          <div>
            <p>
              {this.state.user.name} logged in 
              <button onClick={this.logout}>logout</button>
            </p>
            <h2>Blogs:</h2>
            {this.state.blogs.map(blog => 
              <Blog 
                key={blog.id} 
                blog={blog} 
                likeBlog={this.likeBlog}
                deleteBlog={this.deleteBlog}
                user={this.state.user}
              />
            )}
            <Togglable buttonLabel="new blog">
              <CreateBlog createBlog={this.createBlog}/>
            </Togglable>  
          </div>       
        }
      </div>
    );
  }
}

export default App;
