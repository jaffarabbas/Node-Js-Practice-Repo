const express = require('express');
const path = require('path');
const hbs = require('hbs');
const app = express();

const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views');
app.set('view engine', 'hbs');
app.set('views',viewPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('/', (req, res) => {
    res.render('index');
})


app.listen(3000 , () => {
    console.log('Server Starts !!!!!!!!!!!!! \nHappy Hacking')
})