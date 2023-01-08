var config = require('./config');
var sql = require('mssql');

async function getData(query){
    console.log('23423')
    try{
        // let conn = "mssql://DESKTOP-44LIK56/emp";
        let pool = await sql.connect(config);
        let result = await pool.request().query(query);
        return result.recordsets;
    }catch(err){
        console.log(err);
    }
}

module.exports = {
    getData: getData
};