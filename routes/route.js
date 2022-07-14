const express = require('express')
const router = express.Router()

const cardControlPath = require("../controller/cardController")

router.get('/card/:cardId', cardControlPath.getCardById)
router.post('/card', cardControlPath.createCard)

module.exports = router;