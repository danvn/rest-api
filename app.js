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
})

app.get('/api/posts', function(req, res, next) {
  // Fetch a list of posts and send it to the client
})

app.post('/api/posts', function(req, res, next) {
  // Create a new post in the database and send its ID to the client
})

app.get('/api/posts/:id', function(req, res, next) {
  // Fetch an individual post by ID and send back the post data as JSON
})

app.put('/api/posts/:id', function(req, res, next) {
  // Partially update the post by ID and return success if everything went fine
})

app.delete('/api/posts/:id', function(req, res, next) {
  // Remove the post by ID from the database and return success if everything went fine
})

if (require.main === module) {  // Is this run as a standalone program or a module
  app.listen(3000, function(){        // Boot up the server if standalone program
    console.log('Express server listening on port 3000')
  })
} else {      // Export the code if run as a module
  module.exports = app
}
