let mongoose = require('mongoose')
let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId
let schemaName = 'Task'

let schema = new Schema({
  body: { type: String, required: true },
  authorId: { type: ObjectId, ref: 'User', required: true },
  boardId: { type: ObjectId, ref: 'Board', required: true },
  listId: { type: ObjectId, ref: 'List', required: true }
}, { timestamps: true })

schema.pre('remove', function (next) {
  //lets find all the lists and remove them
  this._id //THIS IS THE BOARD
  Promise.all([
    //Tasks.deleteMany({ boardId: this._id })
    Comments.deleteMany({ taskId: this._id })
  ])
    .then(() => next())
    .catch(err => next(err))
})

module.exports = mongoose.model(schemaName, schema)