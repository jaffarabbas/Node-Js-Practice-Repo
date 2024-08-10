const express = require('express')
const client = require('./client')
const axios = require('axios')
const app = express()

const port = process.env.PORT || 9000

app.get('/',async (req,res) =>{
    const cashedValue = await client.get('todo')
    if(cashedValue){
        return res.json(JSON.parse(cashedValue))
    }
    const {data} = await axios.get('https://jsonplaceholder.typicode.com/todos')
    await client.set('todo',JSON.stringify(data))
    await client.expire('todo',30)
    return res.json(data)
})

app.listen(port,()=>{
    console.log('server is live!')
})