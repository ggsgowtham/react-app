const vertex = require('vertex360')({site_id: process.env.TURBO_APP_ID})
const turbo = require('turbo360')({site_id: process.env.TURBO_APP_ID})
const router = vertex.router()
const controllers = require('../controllers')


router.get('/', (req, res) => {
  const data = req.config // {cdn:<STRING>, global:<OBJECT>}
  res.render('home', data) // render home.mustache
})

router.get('/post/:slug', (req, res) => {
  const slug = req.params.slug
  const postController = new controllers.post() //create instance of class pagecontroller
  postController.get({slug: slug})
  .then(posts => {
  	if(posts.length == 0) { //post not found!!
  		throw new Error('Post Not found!!')
  		return 
  	}
  	const post = posts[0]
  	const data = {
   		post: JSON.stringify(post) //created a data object and passing a key called post and getting slug value
  	}	
  	res.render('post', data)
  })
  .catch(err => {
  	res.json({
  		confirmation: 'fail',
  		message: err.message
  	})
  })
  // const data = {
  // 	post: JSON.stringify({slug: slug}) //created a data object and passing a key called post and getting slug value
  // }
  // res.render('post', data) //rendering the data
})

module.exports = router
