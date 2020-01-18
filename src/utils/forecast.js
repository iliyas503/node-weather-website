const request = require('request');

const forcast= (longitude, latitude, callback)=>{
    const url ='https://api.darksky.net/forecast/bbc444b53acf68a33747482dfb35e375/'+ longitude +',' + latitude + '?units=si';

    request({url,  json:true}, (error, {body})=>{
        if(error){
            callback('unable to connnect to services', undefined);
        }
        else if(body.error){
            callback('Unable to find location', undefined)
        }
        else{
            callback(undefined, body.daily.data[0].summary +' Currently ' + body.currently.temperature)
        }
    })
}

module.exports = forcast;