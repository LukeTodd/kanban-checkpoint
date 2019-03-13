//ALL WORKING 3/12 @ 2:57pm
let Lists = require('../models/list')
let router = require('express').Router()

let baseRoute = "/boards/:boardId/lists"

//THIS ...
router.get(baseRoute, (req, res, next) => {
  Lists.find({ boardId: req.params.boardId, authorId: req.session.uid })
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      console.log(err)
      next(err)
    })
})
//THIS WORKS!
router.post(baseRoute, (req, res, next) => {
  req.body.authorId = req.session.uid
  Lists.create(req.body)
    .then(newList => {
      res.send(newList)
    })
    .catch(err => {
      console.log(err)
      next(err)
    })
})

//this ...
router.put(baseRoute + '/:id', (req, res, next) => {
  let listId = req.param('id')
  Lists.findById(listId)
    .then(list => {
      if (!list.authorId.equals(req.session.uid)) {
        return res.status(401).send("ACCESS DENIED!")
      }
      list.update(req.body, (err) => {
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
  let boardId = req.param('boardId')
  Lists.findOne({ boardId, authorId: req.session.uid })
    .then(list => {
      list.remove(err => {
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