const {MongoClient , ObjectId} = require('mongodb')

const connectionUrl = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'
const id = new ObjectId()
// console.log(id.getTimestamp())

MongoClient.connect(connectionUrl, {useNewUrlParser: true} , (error , client) => {
    if(error) {
        return console.log('Unable to Connect to MongoDB')
    }

    const db = client.db(databaseName)

    //create
    // db.collection('users').findOne({name : 'hel'}, (err, user) => {
    //     if(err) {
    //        return console.log('Unable to Find Error',err);
    //     }

    //     console.log(user)
    // })

    //find/read
    // db.collection('users').find().toArray((err, user) => {
    //     console.log(user[0]['name']);
    // })

    //update
    // const Update = db.collection('users').updateOne({_id: new ObjectId("610aa132acfadceef69b7c1e")} , {
    //     $set : {
    //         name: 'jaffar'
    //     }
    // }).then((result) => {
    //     console.log(result);
    // }).catch((err) => {
    //     console.log(err);
    // })

    //Delete
    db.collection('users').deleteOne({_id: new ObjectId("610aa132acfadceef69b7c1e")}).then((result) => {
        console.log(result)
    }).catch((err) => {
        console.error(err);
    })
})