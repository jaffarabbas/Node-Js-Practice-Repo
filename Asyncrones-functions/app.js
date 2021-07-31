setTimeout(() =>{
    for(var i=0; i<100;i++){
        setTimeout(() =>{
            console.log('command')
        },5000)
    }
},5000)