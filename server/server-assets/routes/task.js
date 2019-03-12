//ALL WORKING 3/12 @ 2:57pm

let Tasks = require('../models/task')
let router = require('express').Router()

let baseRoute = "/boards/:boardId/lists/:listId/tasks"

//This works
router.get(baseRoute, (req, res, next) => {
  // if (!listId) listId = req.params.listId
  Tasks.find({ listId: req.params.listId, authorId: req.session.uid })
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      console.log(err)
      next()
    })
})

//THIS WORKS
router.post(baseRoute, (req, res, next) => {
  req.body.authorId = req.session.uid
  Tasks.create(req.body)
    .then(newTask => {
      res.send(newTask)
    })
    .catch(err => {
      console.log(err)
      next()
    })
})

//This works
router.put(baseRoute + '/:id', (req, res, next) => {
  let taskId = req.param('id')
  Tasks.findById(taskId)
    .then(task => {
      if (!task.authorId.equals(req.session.uid)) {
        return res.status(401).send("ACCESS DENIED!")
      }
      task.update(req.body, (err) => {
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
router.delete(baseRoute + '/:id', (req, res, next) => {
  Tasks.findOne({ taskId: req.params.taskId, authorId: req.session.uid })
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