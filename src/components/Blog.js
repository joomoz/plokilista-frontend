import React from 'react'

class Blog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blog: this.props.blog,
      showInfo: false
    }
  }

  toggleInfo = () => {
    this.setState({ 
      showInfo: !this.state.showInfo
    })
  }

  likeBlog = async (event) => {
    event.preventDefault()
    
    const likedBlog = {
      ...this.state.blog,
      likes: this.state.blog.likes + 1,
      user: this.state.blog.user._id
    }
    console.log(likedBlog)
    await this.props.likeBlog(likedBlog)
    this.setState({blog: likedBlog})
  }

  render() {
    const blogStyle = {
      paddingTop: 10,
      paddingLeft: 2,
      border: 'solid',
      borderWidth: 1,
      marginBottom: 5
    }

    const blogInfo = () => (
      <div>
        <a href={this.state.blog.url}>{this.state.blog.url}</a>
        <p>{this.state.blog.likes} likes <button onClick={this.likeBlog}>like</button> </p>
        <p>Added by: {this.state.blog.user.name}</p>
      </div>
    )

    return (
      <div style={blogStyle} >
        <p onClick={this.toggleInfo}>
          {this.state.blog.title} {this.state.blog.author}
        </p> 
        {this.state.showInfo && blogInfo()}
      </div>  

    )
  } 
}

export default Blog