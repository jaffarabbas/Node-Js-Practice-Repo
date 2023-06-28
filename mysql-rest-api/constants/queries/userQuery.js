class UserQuery{
    static getInsertUserQuery(){
        return "INSERT INTO users (name, email, password,user_type) VALUES (?, ?, ?, ?)";
    }

    static getSelectUserByEmailQuery(){
        return "SELECT * FROM users WHERE email = ?";
    }

    static getSelectUserByIdQuery(){
        return "SELECT * FROM users WHERE id = ?";
    }
}