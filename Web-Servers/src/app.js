const express = require('express');
const path = require('path');
const hbs = require('hbs');

const app = express();

const dir1 = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs');
app.set('views', dir1);
hbs.registerPartials(partialPath)

app.get('', (req, res) => {
    res.render('index',{
        title: 'Home',
        val: true
    })
})

app.get('/about' , (req , res) => {
    res.render('about',{
        about:'my name is jaffar'
    })
})

app.get('*',(req , res) => {
    res.send('404')
})

app.get('/contact' , (req , res) => {
    res.send('Hello contact')
})





app.listen(3000 , () => {
    console.log('Server Starts !!!!!!!!!!!!! \nHappy Hacking')
})