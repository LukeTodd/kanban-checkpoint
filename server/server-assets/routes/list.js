let Lists = require('../models/list')
let router = require('express').Router()
//THIS WORKS
router.get('/', (req, res, next) => {
  let boardId = req.param('boardId')
  Lists.find({ boardId, authorId: req.session.uid })
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      console.log(err)
      next()
    })
})
//THIS WORKS
router.post('/', (req, res, next) => {
  req.body.authorId = req.session.uid
  Lists.create(req.body)
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
  Lists.findById(listId)
    .then(list => {
      if (!list.authorId.equals(req.session.uid)) {
        return res.status(401).send("ACCESS DENIED!")
      }
      list.update(req.body, (err) => {
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
  let boardId = req.param('boardId')
  Lists.findOne({ boardId, authorId: req.session.uid })
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