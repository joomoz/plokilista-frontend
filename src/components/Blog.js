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
      user: this.props.blog.user._id
    }
    await this.props.likeBlog(likedBlog)
    this.setState({blog: likedBlog})
  }

  deleteBlog = async (event) => {
    event.preventDefault()
    if (!window.confirm(`Do you really want to delete ${this.state.blog.title}?`)) {
     return;
    }
    
    await this.props.deleteBlog(this.state.blog)
    this.setState({blog: null})
  }

  render() {
    if (this.state.blog === null) {
      return null;
    }

    const blogStyle = {
      paddingTop: 10,
      paddingLeft: 2,
      border: 'solid',
      borderWidth: 1,
      marginBottom: 5
    }

    const deleteBtn = !this.props.blog.user || this.props.blog.user.name === this.props.user.name ? 
    <p><button onClick={this.deleteBlog}>delete</button></p> : null   

    const blogInfo = () => (
      <div>
        <a href={this.state.blog.url}>{this.state.blog.url}</a>
        <p>{this.state.blog.likes} likes <button onClick={this.likeBlog}>like</button> </p>
        <p>Added by: {this.props.blog.user ? this.props.blog.user.name : ""}</p>
        {deleteBtn}
      </div>
    )

    return (
      <div style={blogStyle} className="content">
        <div onClick={this.toggleInfo} className="titleDiv">
          <p>{this.state.blog.title} {this.state.blog.author}</p>
        </div> 
        {this.state.showInfo && blogInfo()}
      </div>  

    )
  } 
}

export default Blog