import mysql from 'mysql';
import dotenv from 'dotenv';

dotenv.config();

class DbConnection{
    connection;
    static #connect = async () => {
        this.connection = await mysql.createConnection({
            host: process.env.HOST,
            user: process.env.USER,
            password: process.env.PASSWORD,
            database: process.env.DB
        });
    }
    static databaseConnection = async () => {
        this.#connect().then(() => {
            this.connection.connect((err) => {
                if (err) throw err;
                console.log('Connected!');
            });
        });
    }
}

export default DbConnection;