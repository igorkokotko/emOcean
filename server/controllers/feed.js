const {db} = require("../config/databaseConfig");

let getFeed = function (req, res) {
    try {
        let collection = db.collection('posts').get()  
        collection.then((querySnapshot) => {
            let posts = {}
            querySnapshot.docs.forEach((doc) => {
                posts[doc.id] = doc.data();
            })
            console.log(posts)
        })
    } catch (error) {
        res.status(500).send('Error - ' + error)
    }    
}

module.exports = {
    getFeed
}