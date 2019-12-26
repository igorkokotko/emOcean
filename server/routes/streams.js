const express = require('express')
const router = express.Router()
const { getStream, getStreamList, createStream } = require('../controllers/streams')
const protected = require("../middleware/protectRoute")

router.get('/', getStreamList)
router.post('/',  protected, createStream)
router.get('/:id', getStream)

module.exports = router