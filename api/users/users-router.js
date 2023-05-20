const express = require('express');

// You will need `users-model.js` and `posts-model.js` both
const Users = require('./users-model')
const Posts = require('../posts/posts-model')

// The middleware functions also need to be required

const router = express.Router();


const { logger, validateUserId, validateUser, validatePost } = require('../middleware/middleware')


router.get('/', (req, res) => {
  Users.get()
  .then(resp => {
    res.status(200).json(resp)
  }).catch(error => {
    res.status(500).json(error)
  })
})
  // RETURN AN ARRAY WITH ALL THE USERS


 router.get('/:id', validateUserId, (req, res) => {
  Users.getById(req.params.id)
  .then(resp => {
    res.status(200).json(resp)
  })
  .catch(error => {
    res.status(500).json({error})
  })
})
// RETURN THE USER OBJECT// this needs a middleware to verify user id
  router.post('/', validateUser, (req, res, next) => {
    Users.insert({name: req.body.name})
  .then(newUser=> {
    res.status(200).json(newUser)
  })
  .catch(error => {
    res.status(500).json({error: error.message, stack: error.stack})
  })
  // RETURN THE NEWLY CREATED USER OBJECT
  // this needs a middleware to check that the request body is valid
});

router.put('/:id', validateUserId, validateUser, (req, res) => {
  Users.update(req.params.id, {name: req.body.name})
  .then(() => {
    Users.getById(req.params.id)
    .then(result => {
      res.status(200).json(result)
    })
  })
  .catch(error => {
    res.status(500).json({error: error.message, stack: error.stack})
  })
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
});

router.delete('/:id', validateUserId,  (req, res) => {
  const id = req.params.id
  Users.getById(id) 
    .then(result => {
      const user = result
      Users.remove(id)
    .then(resp => {
      res.json(user)
    })
    })
 .catch(error => {
  res.status(500).json({
    message: error.message, 
  stack: error.stack})
 })
});
// RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id

router.get('/:id/posts', validateUserId,  (req, res) => {
  Users.getUserPosts(req.params.id)
  .then(resp => {
    res.json(resp)
  })
  .catch(err => {
    res.status(500).json('Internal Service Error')
  })
});
// RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id


router.post('/:id/posts', validateUserId, validatePost, async (req, res, next) => {
  try {
    const result = await Posts.insert({user_id: req.params.id, text: req.body.text})
    res.status(201).json(result)
  }catch (err) {
    next(err)
  }
  });
// RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id // and another middleware to check that the request body is valid // do not forget to export the router

  module.exports = router