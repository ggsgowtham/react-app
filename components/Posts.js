import React, { Component } from 'react'
import ReactDOM from 'react-dom'

class Posts extends Component {

	constructor() {
		super()
		this.state = {
			recentPosts: []
		}
	}


	componentDidMount() {
		//console.log('component did mount');
		fetch('/api/post')
		.then(response => {
			return response.json()
		})
		.then(payload => {
			if(payload.confirmation != 'success') {
				throw new Error('Something went wrong!')
				return
			}
			const posts = payload.data 
			//console.log('Posts - '+JSON.stringify(posts))
			this.setState({
				recentPosts: posts
			})
		})
		.catch(error => {
			console.log('Error -'+err.message);
		})		
	}

	render() {
		return(
			<div>
				<h1>Recent Posts</h1>
				<ul style={{listStyleType: 'none'}}>
					{
						this.state.recentPosts.map(post => {
							return (
								<li key={ post.id }>
									<div style={{display: 'flex', marginbottom: 16}}>
										<a href={'/post/'+ post.slug}>
											<img style={{margin: 12}} src={post.image+'=s180-c'} />
										</a>
										<div>
											<small>{post.dateString}</small>
											<a href={'/post/'+ post.slug}>
												<h3 style={{marginTop: 0}}>{post.title}</h3>
											</a>
											<p>{post.preview}</p>
											<a style={{color: 'red'}} href={'/post/'+ post.slug}>Read More</a>
										</div>
									</div>
								</li>
							)
						})
					}
				</ul>
			</div>
		)
	}
}

export default Posts