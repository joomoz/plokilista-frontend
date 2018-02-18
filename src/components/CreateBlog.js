import React from 'react'

class CreateBlog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      author: '',
      url: ''
    }
  }

  createBlog = async (event) => {
    event.preventDefault()

    await this.props.createBlog({
      title: this.state.title,
      author: this.state.author,
      url: this.state.url
    })
      
    this.setState({ title: '', author: '', url: ''})
  }

  handleFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  render() {
    const blogForm = () => (
      <div>
        <h2>Create new blog entry:</h2>
        <form onSubmit={this.createBlog}>
          <div>
            title
            <input
              type="text"
              name="title"
              value={this.state.title}
              onChange={this.handleFieldChange}
            />
          </div>
          <div>
            author
            <input
              type="text"
              name="author"
              value={this.state.author}
              onChange={this.handleFieldChange}
            />
          </div>
          <div>
            url
            <input
              type="text"
              name="url"
              value={this.state.url}
              onChange={this.handleFieldChange}
            />
          </div>
          <button type="submit">create</button>
        </form>
      </div> 
    )

    return (
      <div>
        {blogForm()} 
      </div>
    ) 
  }

}

export default CreateBlog