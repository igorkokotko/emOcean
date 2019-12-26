const streamsService = require("../services/StreamsService")
const profilesService = require("../services/ProfilesService")

const createStream = function(req, res) {
  const streamData = req.body
  if (!streamData.title || streamData.title.length === 0) {
    streamData.title = "No title"
  }
  streamData.startTime = new Date()
  streamData.author = req.userId
  streamsService.createStream(streamData)
    .then(() => {
      res.status(201).json(streamData)
    })
    .catch(err => {
      res.status(500).send(err)
    });
}

const getStreamList = function(req, res) {
  streamsService.getStreamList()
    .then(snapshot => {
      const streams = [];
      const profilePromises = []
      snapshot.forEach(doc => {
        profilePromises.push(profilesService.getProfileById(doc.get('author').id))
      });
      Promise.all(profilePromises)
        .then(authors => {
          authors.forEach((author, index) => {
            streams.push({ ...snapshot.docs[index].data(), id:snapshot.docs[index].id, author })
          })
          res.json(streams)
        })
    })
    .catch(err => {
      console.log('Error getting documents', err);
      res.status(500).send(err)
    });
}

const getStream = function(req, res) {
  const streamId = req.params.id
  streamsService.getStreamById(streamId)
    .then(snapshot => {
      if (snapshot.empty) {
        return res.status(400).send('No matching documents.')
      }
      profilesService.getProfileById(snapshot.author.id)
        .then(author => {
          res.status(200).json({ ...snapshot, author })
        })
    })
    .catch(err => {
      console.log('Error getting documents', err);
      res.status(500).send(err)
    });
}


module.exports = {
  createStream,
  getStreamList,
  getStream
}