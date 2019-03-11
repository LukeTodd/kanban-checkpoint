let Lists = require('../models/list')
let router = require('express').Router()

router.get('/', (req, res, next) => {
  Lists.find({ _id: req.params.id, authorId: req.session.uid })
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
      return res.status(200).send(newList)
    })
    .catch(err => {
      console.log(err)
      next()
    })
})
module.exports = router