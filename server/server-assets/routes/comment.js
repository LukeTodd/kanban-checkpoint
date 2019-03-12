let router = require('express').Router()
let Comments = require('../models/comment')

//GET
//THIS WORKS
router.get('/', (req, res, next) => {
  let taskId = req.param('taskId')
  Comments.find({ taskId, authorId: req.session.uid })
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
router.post('/', (req, res, next) => {
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
router.put('/:id', (req, res, next) => {
  let taskId = req.param('boardId')
  Comments.find({ taskId, authorId: req.session.uid })
    .then(list => {
      if (!list.taskId.equals(req.session.uid)) {
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
router.delete('/:id', (req, res, next) => {
  let commentId = req.param('commentId')
  Comments.findOne({ commentId, authorId: req.session.uid })
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