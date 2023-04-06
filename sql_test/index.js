const { reset } = require('nodemon');
var express = require('express');
const dboperations = require('./dbOperation');
const app = express();
const router = new express.Router();
app.use(express.json());

router.get('/get', function (req, res) {
    dboperations.getLoginDetails().then((result) => {
        res.send(result);
    }).catch((err) => {
        console.log(err);
    });
});

app.use(router);

var server = app.listen(5000, function () {
    console.log('Server is running..');
});