'use-strict';

const dotenv = require('dotenv');
const assert = require('assert');

dotenv.config()

const {PORT,HOST,HOST_URL,SQL_DATABASE,SQL_SERVER} = process.env;

assert(PORT, 'PORT is required');
assert(HOST, 'HOST is required');

module.exports = {
    port: PORT,
    host: HOST,
    host_url: HOST_URL,
    sql:{
        server: SQL_SERVER,
        database: SQL_DATABASE,
        options:{
            encrypt: sqlEncrypt,
            enableArithAbort: true,
            trustedconnection: true
        }
    }
};

module.exports = config;