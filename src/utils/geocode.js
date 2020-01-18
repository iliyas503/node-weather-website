/*Simple code for knowing the more than 1 Location coordinates  without repeating the code*/
const request = require('request');
const geocoding = (location, callback)=>{
    const geocodeURL ='https://api.mapbox.com/geocoding/v5/mapbox.places/'+location+'.json?access_token=pk.eyJ1IjoiaWxpeWFzNTAzIiwiYSI6ImNrNDZtMmlyNTBqeWEzb3F1OGVqbHFub3AifQ.U1eB8eEb3SKeea5YO_QE-w';
    request({url: geocodeURL, json:true}, (error, {body})=>{
            if(error)
                callback('Unable to connect to mapbox services');
            else if(body.features.length ===0){
                callback('Location coordinates not available')   
            }
            else        
            callback(undefined,{
                longitude: body.features[0].center[0],
                latitude: body.features[0].center[1],
                location: body.features[0].place_name
            })
    })  
}
module.exports = geocoding;