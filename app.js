var express = require('express'),
  bodyParser = require('body-parser'),
  logger = require('morgan')

let posts = require('./posts.json')

var app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(logger('dev'))


app.get('/', function(req, res, next) {
  // Serve an info message
  res.send('Please select a collection, e.g., /posts')
})

app.get('/api/posts', function(req, res, next) {
  // Fetch a list of posts and send it to the client
  let results = posts
  res.send(results)
})

app.post('/api/posts', function(req, res, next) {
  // Create a new post in the database and send its ID to the client
  let post = req.body
  post.id = posts.length
  posts.push(post)
  res.send(post)
})

app.get('/api/posts/:id', function(req, res, next) {
  // Fetch an individual post by ID and send back the post data as JSON
  let result = posts.find((post) => {
    return post.id == req.params.id
  })
  res.send(result)
})


app.put('/api/posts/:id', function(req, res, next) {
  let postIndex = posts.findIndex((post)=>{
  // Partially update the post by ID and return success if everything went fine    
  // console.log(req.params.id, post.id,req.body.id);
    return (post.id == req.params.id && post.id == req.body.id)
  })
  if (postIndex == -1) return next(new Error('Post not found'))
  posts[postIndex] = req.body
  res.send({msg:'success'})
})

app.delete('/api/posts/:id', function(req, res, next) {
  // Remove the post by ID from the database and return success if everything went fine
  let postIndex = posts.findIndex((post) => {
    return (post.id == req.params.id && post.id == req.body.id)
  })
  let result = posts.splice(postIndex, 1)
  res.send((result.length == 1)?{msg: 'success'} : {msg: 'error'})
})

if (require.main === module) {        // Is this run as a standalone program or a module
  app.listen(3000, function(){        // Boot up the server if standalone program
    console.log('Express server listening on port 3000')
  })
} else {      // Export the code if run as a module
  module.exports = app
}
