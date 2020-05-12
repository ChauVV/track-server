const express = require('express')
const mongoose = require('mongoose')
const requireAuth = require('../middlewares/requireAuth')

const Track = mongoose.model('Track')

const router = express.Router()


/**
 * @swagger
 * definitions:
 *   Coord:
 *      properties:
 *        latitude:
 *          type: number
 *        longitude:
 *          type: number
 *        altitude:
 *          type: number
 *        accuracy:
 *          type: number
 *        heading:
 *          type: number
 *        speed:
 *          type: number
 *         
 *   Track:
 *     properties:
 *       timestamp:
 *         type: string
 *       coords:
 *         type: object
 */

/**
 * @swagger
 * /tracks:
 *   get:
 *     tags:
 *       - Tracks
 *     description: Returns all Tracks
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of Tracks
 *         schema:
 *           $ref: '#/definitions/Track'
 */
router.get('/tracks', requireAuth,  async (req, res) => {
  const tracks = await Track.find({ userId: req.user._id })

  res.send(tracks)
})

/**
 * @swagger
 * /tracks:
 *   post:
 *     tags:
 *       - Tracks
 *     description: Creates a new track
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: track
 *         description: Puppy object
 *         in: body
 *         required: true
 *       
 *     responses:
 *       200:
 *         description: Successfully created
 */
router.post('/tracks', requireAuth, async (req, res) => {
  const { name, locations } = req.body
  
  if (!name || !locations) {
    return res.status(422).send({ error: 'You must provide a name and locations'})
  }

  try {
    const track = new Track({ name, locations, userId: req.user._id })
    await track.save()
    res.send(track)
  } catch (error) {
    res.status(422).send({ error: error.message })
  }
})

module.exports = router