const request = require('request')


const forecast = (latitude,longitude,callback)=>{

    const url  = 'http://api.weatherstack.com/current?access_key=b3a963e0647b8348a6c8061c947d0185&query='+ latitude + ',' + longitude + '&units=f'
 
 request({url:url,json:true},(error,response)=>{
     if(error){
         callback('Unable to connect to weather service',undefined)
     }else if(response.body.error){
         callback('Unable to find location',undefined)
     }else{
        const temp = response.body.current.temperature
        const feelslike = response.body.current.feelslike
       
        callback(undefined,"it is currently "+temp+" outside and feels like "+feelslike)
     }




 })
}

module.exports = forecast