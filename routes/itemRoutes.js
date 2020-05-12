const express = require('express')
const mongoose = require('mongoose')
const requireAuth = require('../middlewares/requireAuth')

const Item = mongoose.model('Item')

const router = express.Router()

router.get('/items', async (req, res) => {
  try {
    const item = await Item.find({})

  res.send(item)
  } catch (error) {
    return res.status(401).send({ error: error})
  }
})



router.post('/items', async (req, res) => {
  const { name } = req.body
  
  if (!name) {
    res.status(422).send({ error: 'You must provide a name'})
  }

  try {
    const item = new Item({ name })
    await item.save()
    res.send(item)
  } catch (error) {
    res.status(422).send({ error: error.message })
  }
})

module.exports = router