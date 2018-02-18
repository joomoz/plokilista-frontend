import React from 'react'
import Blog from './components/Blog'
import CreateBlog from './components/CreateBlog'
import blogService from './services/blogs'
import loginService from './services/login'


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      error: '',
      blogs: [],
      username: '',
      password: '',
      user: null
    }
  }

  componentDidMount() {
    blogService.getAll().then(blogs =>
      this.setState({ blogs })
    )

    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      this.setState({user})
      blogService.setToken(user.token)
    }
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
      this.setState({blogs: this.state.blogs.concat(newBlog)})
    } catch(exception) {
      this.setState({
        error: 'unable to create new blog entry',
      })
      setTimeout(() => {
        this.setState({ error: null })
      }, 5000)
    }
  }

  render() {
    const loginForm = () => (
      <div>
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
      <div>
        <h1>Plokilist frontend</h1>
        {this.state.user === null ?
          loginForm() :
          <div>
            <p>
              {this.state.user.name} logged in 
              <button onClick={this.logout}>logout</button>
            </p>
            <h2>Blogs:</h2>
            {this.state.blogs.map(blog => 
              <Blog key={blog.id} blog={blog}/>
            )}
            <CreateBlog createBlog={this.createBlog}/>
          </div>       
        }
      </div>
    );
  }
}

export default App;
