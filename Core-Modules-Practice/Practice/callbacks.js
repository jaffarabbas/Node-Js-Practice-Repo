const doCallback = (callback) => {
    setTimeout(()=>{
        callback(undefined,[1,2,4]);
    },2000);
}

doCallback((err, result) => {
    if(err) {
        return console.error(err);
    }

    console.log(result);
})