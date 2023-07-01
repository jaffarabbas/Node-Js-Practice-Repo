import DbConnection from "../config/dbConfig.js";

module.exports = {
    create: (data, callBack) => {
        DbConnection.connection.query(
            UserQuery.getUsers,
            [data.name, data.email, data.password, data.user_type],
             (err, results, fields) => {  
                if (err) {
                    return callBack(err);
                }
                return callBack(null, results); 
        });
    }
}