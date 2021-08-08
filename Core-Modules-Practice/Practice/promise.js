const doWorkPromis = new Promise((resolve, reject) => {
    setTimeout(() => {
      //  resolve([1,2,3,4]);
        reject("Error");
    },1000);
})

doWorkPromis.then((res) => {
    console.log(res);
}).catch((err) => {
    console.log(err);
})