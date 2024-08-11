const express = require('express')
const sql = require('mssql');
const client = require('./config/redisConfig');
const app = express()

const port = process.env.PORT || 9000

const config = {
    user: 'sa',
    password: '',
    server: 'mssql-server',
    database: 'DB_JEWELSITE',
    options: {
        encrypt: false, // Use true for Azure SQL
        trustServerCertificate: true, // Change to false if you are using a trusted certificate
    },
};

app.get('/', async (req, res) => {
    try {
        // Connect to the database
        await sql.connect(config);
        const cacheData = await client.get("user:1")
        if(cacheData) return res.json(JSON.parse(cacheData));
        const result = await sql.query `SELECT * FROM USERS`;
        await client.set("user:1",JSON.stringify(result.recordset))
        await client.expire("user:1",100)
        res.json(result.recordset);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error querying the database');
    } finally {
        // Close the connection
        await sql.close();
    }
});


app.listen(port, () => {
    console.log('server is live!')
})