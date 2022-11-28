const {Schema, model} = require('mongoose')

const Note = new Schema({
    title: {type: String, required: true},
    text: {type: String, required: true},
    date: {type: Date, required: true},
})

module.exports = model('Note', Note)