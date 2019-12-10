const {db} = require("../config/databaseConfig");

let getFeedAnonimus = function (req, res) {
    try {
        const collection = db.collection('posts').get()  
        collection.then((querySnapshot) => {
            let posts = {}
            querySnapshot.docs.forEach((doc) => {
                posts[doc.id] = doc.data();
            })
            res.json({posts})
        })
    } catch (error) {
        res.status(500).send('Error - ' + error)
    }    
}

let getFeedByPreferences = function (req, res) {
    try {
        const userDoc = db.collection('users').doc(req.userId)        
        let preferences = userDoc
            .get()
            .then(doc => {
                console.log(doc.data().preferences);
                let pref = doc.data().preferences

                const docs = db.collection('posts')
                const postsCollection = docs.where('tag', 'in', pref).get()
                postsCollection.then((querySnapshot) => {
                    let posts = {}
                    querySnapshot.docs.forEach((doc) => {
                        posts[doc.id] = doc.data();
                    })
                    res.json({posts})
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