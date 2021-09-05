const express = require('express');
require('./db/mongoose');
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

const bcrypt = require('bcryptjs');

const CheckPassword = async () => {
    const pass = 'Red1234';
    const hashPassword = await bcrypt.hash(pass, 8);
    //checking the password
    const isMatch = await bcrypt.compare(pass, hashPassword);
}

CheckPassword();

app.listen(port,()=>{
    console.log('Server start at ',port);
})

const jwt = require('jsonwebtoken');

//genrating json web token

// const generateToken = async () => { 
//     const token = jwt.sign({_id: 'abc123'},'thisismytoken' , {expiresIn:'7 days'})
//     console.log('token:',token);

//     const data = jwt.verify(token, 'thisismytoken')
//     console.log(data);
// }

// generateToken();