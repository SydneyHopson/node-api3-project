const Users = require('../users/users-model')

function logger(req, res, next) {
  // DO YOUR MAGIC

  next();

}

function validateUserId(req, res, next) {
  // DO YOUR MAGIC

  Users.getById(req.params.id)
  .then(resp => {
    if (!resp) { 
      res.status(404).json({ message: "user not found" })
      return;
    } else {
      req.user = resp
      next();
    }
  })
  .catch(err => {
    res.status(500).json('Internal Server Error')
  })
}





function validateUser(req, res, next) {
  // DO YOUR MAGIC

  if (!req.body.name) {
    res.status(400).json({message: "missing required name field"})
    return;
  } else {
    next();
  }
  }
  


function validatePost(req, res, next) {
  // DO YOUR MAGIC

  if (!req.body.text) {
    res.status(400).json({message: "missing required text field"})
  } else {
    next();
  }

}

// do not forget to expose these functions to other modules

module.exports = { logger, validateUserId, validateUser, validatePost}
