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

    db.collection('user').insertOne({
        _id: id,
        name: 'kooo',
        age: 21
    }, (err, result) => {
        if(err) {
            return console.log("Error: ",err)
        }
        console.log(result.insertedId.toHexString())
    })
    // db.collection('users').insertMany(
    //     [
    //         {
    //             name: 'hel'
    //         },
    //         {
    //             name: 'asdasd'
    //         }
    //     ],(err,result) => {
    //         if(err) {
    //             return console.log(err)
    //         }
    //         console.log(result.ops)
    //     }
    // )
})