import DbConnection from "../config/dbConfig.js";

module.exports = {
    create: (data, callBack) => {
        DbConnection.connection.query(UserQuery.getUsers)
    }
}