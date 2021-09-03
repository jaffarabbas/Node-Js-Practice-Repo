const request = require('request')

const url = "http://api.weatherapi.com/v1/current.json?key=22a50d93f8584e0b86795003213107&q=Karachi&aqi=no";

request({url : url , json: true},(error, response) => {
    //const data = JSON.parse(response.body);
    // console.log(data.current);
    console.log(response.body.current["is_day"]);
})