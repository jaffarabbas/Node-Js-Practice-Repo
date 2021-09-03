require('./src/db/mongoose')
const User = require('./src/model/user')

User.findByIdAndUpdate('611014d2fe3b8f5a50fa3d88', {age : 21}).then(users => {
    console.log(users);
    return User.countDocuments({age: 21});
}).then(result => {
    console.log(result);
}).catch(err => {
    console.log(err);
})

