// 'use strict';

// const express = require('express');
// const config = require('./config');
// const cors = require('cors');
// const bodyParser = require('body-parser');

// const app = express();

// app.use(cors());
// app.use(bodyParser.json());

// app.listen(config.port,() => {
//     console.log('Server is running on port ' + config.port);
// });

var express = require('express');
var sql = require("mssql/msnodesqlv8");
// require("");
var app = express();

app.get('/', function (req, res) {
   
    // var sql = require("mssql");

    // config for your database
    var config = {
        server: 'DESKTOP-44LIK56', 
        // user:'DARKLORD',
        database: 'emp' ,
        driver: "msnodesqlv8",
        options: {
            trustedConnection: true,
        },
        // trustServerCertificate: true,
    };

    // connect to your database
    sql.connect(config, function (err) {
        console.log('connected');
    
        if (err) console.log(err);

        // create Request object
        var request = new sql.Request();
           
        // query to the database and get the records
        request.query('select * from orders', function (err, recordset) {
            
            if (err) console.log(err)

            // send records as a response
            res.send(recordset);
            
        });
    });
});

var server = app.listen(5000, function () {
    console.log('Server is running..');
});