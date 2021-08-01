const express = require('express');
const path = require('path');

const app = express();

const dir1 = path.join(__dirname, '../public')

app.use(express.static(dir1))

app.get('/about' , (req , res) => {
    res.send('Hello about')
})

app.get('/contact' , (req , res) => {
    res.send('Hello contact')
})





app.listen(3000 , () => {
    console.log('Server Starts !!!!!!!!!!!!! \nHappy Hacking')
})