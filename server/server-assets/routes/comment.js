//ALL WORKING 3/12 @ 2:57pm

let router = require('express').Router()
let Comments = require('../models/comment')

let baseRoute = "/boards/:boardId/lists/:listId/tasks/:taskId/comments"

//GET
//THIS WORKS
router.get(baseRoute, (req, res, next) => {
  Comments.find({ taskId: req.params.taskId, authorId: req.session.uid })
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      console.log(err)
      next(err)
    })
})

//POST
//THIS WORKS
router.post(baseRoute, (req, res, next) => {
  req.body.authorId = req.session.uid
  Comments.create(req.body)
    .then(newComment => {
      res.send(newComment)
    })
    .catch(err => {
      console.log(err)
      next(err)
    })
})

//Hasn't been tested
router.put(baseRoute + '/:id', (req, res, next) => {
  let commentId = req.param('id')
  Comments.findById(commentId)
    .then(comment => {
      if (!comment.authorId.equals(req.session.uid)) {
        return res.status(401).send("ACCESS DENIED!")
      }
      comment.update(req.body, (err) => {
        if (err) {
          console.log(err)
          next(err)
          return
        }
        res.send("Successfully Updated")
      });
    })
    .catch(err => {
      console.log(err)
      next(err)
    })
})

//DELETE
//THIS WORKS
router.delete(baseRoute + '/:id', (req, res, next) => {
  Comments.findOne({ _id: req.params.id, authorId: req.session.uid })
    .then(comment => {
      comment.remove(err => {
        if (err) {
          console.log(err)
          next(err)
          return
        }
        res.send("Successfully Deleted")
      })
        .catch(err => {
          res.status(400).send('ACCESS DENIED; Invalid Request')
        })
    })
})

module.exports = router