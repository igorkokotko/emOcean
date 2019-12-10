const {db} = require("../config/databaseConfig");

let getFeedAnonimus = function (req, res) {
    try {
        const collection = db.collection('posts').get()  
        collection.then((querySnapshot) => {
            if (querySnapshot.empty) {
                return res.status(400).send('No matching documents.')
            }
            let posts = {}
            querySnapshot.docs.forEach((doc) => {
                posts[doc.id] = doc.data();
            })
            res.json(posts)
        })
    } catch (error) {
        res.status(500).send('Error - ' + error)
    }    
}

let getFeedByPreferences = function (req, res) {
    try {
        const userDoc = db.collection('users').doc(req.userId)        
        userDoc
            .get()
            .then(doc => {
                let pref = doc.data().preferences

                const postsDocs = db.collection('posts')
                const postsCollection = postsDocs.where('tag', 'array-contains-any', pref).get()
                postsCollection.then((querySnapshot) => {
                    if (querySnapshot.empty) {
                        return res.status(400).send('No matching tags.')
                    }
                    let posts = {}
                    querySnapshot.docs.forEach((doc) => {
                        posts[doc.id] = doc.data();
                    })
                    res.json(posts)
                })
          })
    } catch (error) {
        res.status(500).send('Error - ' + error)
    }    
}

module.exports = {
    getFeedAnonimus,
    getFeedByPreferences
}