const validator = require('validator')
const chalk = require('chalk')
const yargs = require('yargs')
const readNotes = require('./util.js') 

// fs.writeFileSync('file.txt','hello jaffar hii');

// console.log(readNotes());

//is email is valid
// console.log(validator.isEmail('gamaportal8@gmail.com'))

//chalk sccuess

// console.log(chalk.black.bgGreen.bold('jaffar'))

// console.log(chalk.keyword('orange')('Yay for orange colored text!'));
// console.log(chalk.rgb(123, 45, 67).underline('Underlined reddish color'));
// console.log(chalk.hex('#DEADED').bold('Bold gray!'));

// console.log(process.argv)

// const command = process.argv[2];

// if(command === 'add') {
//     console.log('Added Note')
// }else if(command === 'remove'){
//     console.log('Removed Note')
// }

// console.log(yargs.argv["title"])

yargs.command({
    command: 'add',
    describe: 'hello this is add',
    builder: {
        describe: 'Note title'
    },
    handler: function(argv){
        console.log('command add',argv)
    }
})

yargs.command({
    command: 'remove',
    describe: 'hello this is remove',
    handler: function(){
        console.log('command remove')
    }
})

yargs.command({
    command: 'read',
    describe: 'hello this is read',
    handler: function(){
        console.log('command read')
    }
})

yargs.command({
    command: 'edit',
    describe: 'hello this is edit',
    handler: function(){
        console.log('command edit')
    }
})
console.log(yargs.argv)