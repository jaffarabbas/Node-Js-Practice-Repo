import express from "express"

const app = express()

const PORT = process.env.PORT || 7000

app.get('/',(req,res) => {
    return res.json({mess:"hello docer"})
})

app.listen(PORT,() => console.log('server running at '+PORT))