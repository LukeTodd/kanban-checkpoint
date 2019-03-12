let Tasks = require('../models/task')
let router = require('express').Router()

//This works
router.get('/', (req, res, next) => {
  let listId = req.param('listId')
  Tasks.find({ listId, authorId: req.session.uid })
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      console.log(err)
      next()
    })
})

router.post('/', (req, res, next) => {
  req.body.authorId = req.session.uid
  Tasks.create(req.body)
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
  let listId = req.param('listId')
  Tasks.find({ listId, authorId: req.session.uid })
    .then(task => {
      if (!task.listId.equals(req.session.uid)) {
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
router.delete('/:id', (req, res, next) => {
  let taskId = req.param('taskId')
  Tasks.findOne({ taskId, authorId: req.session.uid })
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