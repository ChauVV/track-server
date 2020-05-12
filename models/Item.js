const mongoose = require('mongoose')




const itemSchema = new mongoose.Schema({

  name: {
    type: String,
    default: ''
  }
})

mongoose.model('Item', itemSchema)