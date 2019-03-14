let mongoose = require('mongoose')
let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId
let schemaName = 'Comment'

let schema = new Schema({
  body: { type: String, required: true },
  creator: { type: String },
  authorId: { type: ObjectId, ref: 'User', required: true },
  boardId: { type: ObjectId, ref: 'Board', required: true },
  listId: { type: ObjectId, ref: 'List', required: true },
  taskId: { type: ObjectId, ref: 'Task', required: true }
}, { timestamps: true })


module.exports = mongoose.model(schemaName, schema)