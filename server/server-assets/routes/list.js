let Lists = require('../models/list')
let router = require('express').Router()

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

module.exports = router