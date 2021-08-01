const express = require('express');

const app = express();

app.get('' , (req , res) => {
    res.send('Hello World')
})

app.get('/about' , (req , res) => {
    res.send('Hello about')
})

app.get('/contact' , (req , res) => {
    res.send('Hello contact')
})





app.listen(3000 , () => {
    console.log('Server Starts !!!!!!!!!!!!! \nHappy Hacking')
})