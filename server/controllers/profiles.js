const asyncMiddleware = require("../middleware/asyncMiddleware")
const searchService = require("../services/SearchService")

const search = asyncMiddleware(async (req, res, next) => {
  const { nickname } = req.body
  // db logic
  const message = await searchService.findByNickname(nickname)
  res.status(200).json({ message })
})

module.exports = {
  search
}
