import React from 'react'

class Blog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showInfo: false
    }
  }

  toggleInfo = () => {
    this.setState({ 
      showInfo: !this.state.showInfo
    })
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
        <a href={this.props.blog.url}>{this.props.blog.url}</a>
        <p>{this.props.blog.likes} likes <button>like</button> </p>
        <p>Added by: {this.props.blog.user.name}</p>
      </div>
    )


    return (
      <div style={blogStyle} onClick={this.toggleInfo}>
        <p>
          {this.props.blog.title} {this.props.blog.author}
        </p> 
        {this.state.showInfo && blogInfo()}
      </div>  

    )
  } 
}

export default Blog