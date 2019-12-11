import React, { Component } from 'react'

class Post extends Component {
	// render text in pure html in react we use dangerouslySetInnerHTML
	render() {
		const post = this.props.post
		return(
			<div>
			
				<span>{post.dateString}</span>	
				<h1>{post.title}</h1>
				<img src={post.image} />
				<p dangerouslySetInnerHTML = {{__html:post.text}}></p>
			
			</div>
		)		
	}
}

export default Post