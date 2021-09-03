const {MongoClient , ObjectId} = require('mongodb')

const connectionUrl = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'
const id = new ObjectId()

MongoClient.connect(connectionUrl, {useNewUrlParser: true} , (error , client) => {
    if(error) {
        return console.log('Unable to Connect to MongoDB')
    }
    const db = client.db(databaseName)
})