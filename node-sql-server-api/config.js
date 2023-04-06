// 'use-strict';
const sql = require("mssql/msnodesqlv8");
const dotenv = require('dotenv');
const assert = require('assert');


dotenv.config()

const { PORT, HOST, HOST_URL, SQL_DATABASE, SQL_SERVER } = process.env;

// assert(PORT, 'PORT is required');
// assert(HOST, 'HOST is required');

// const config = {
//     server: 'DESKTOP-44LIK56',
//     database: 'emp',
//     options: {
//         enableArithAbort: true,
//         trustedconnection: true,
//         instancename: 'MSSQLSERVER',
//     },
//     port: 1433,
// };

const config = {
    server: 'DESKTOP-44LIK56',
    database: 'emp',
    user:'darklord',
    password:'',
    options: {
        trustedConnection: true,
        trustServerCertificate: true,
        instancename: 'MSSQLSERVER',
        // driver: "msnodesqlv8",
    },
    PORT: 1433,
};
module.exports = config;