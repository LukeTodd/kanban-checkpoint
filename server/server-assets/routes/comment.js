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
      next()
    })
})

//POST
//THIS WORKS
router.post(baseRoute, (req, res, next) => {
  req.body.authorId = req.session.uid
  Comments.create(req.body)
    .then(newList => {
      res.send(newList)
    })
    .catch(err => {
      console.log(err)
      next()
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
          next()
          return
        }
        res.send("Successfully Updated")
      });
    })
    .catch(err => {
      console.log(err)
      next()
    })
})

//DELETE
//THIS WORKS
router.delete(baseRoute + '/:id', (req, res, next) => {
  Comments.findOne({ commentId: req.params.commentId, authorId: req.session.uid })
    .then(board => {
      board.remove(err => {
        if (err) {
          console.log(err)
          next()
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