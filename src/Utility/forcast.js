const request = require('request')

//Input: This method will take longitude and latitude and another function with two parameter.
//Output: It will use the weatherstack api to get the weather information of given longitude and latitude
//        and call the function that given by user.It will send pass either error or object.This object has weather information
//Error:If it does not get weather or can not connect to local server then It will return error.
const forcast = (longitude, latitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=98c751e0adbc4b48dd64681c22ef8e4f&query=' + longitude + ',' + latitude;

    request({ url: url, json: true }, (error, resopnse) => {
        if (error) {
            callback("Unable to connect local server", undefined);
        } else if (resopnse.body.error) {

            callback("Unable to get the weather", undefined)
        } else {
            callback(undefined, {
                temperature: resopnse.body.current.temperature,
                feelslike: resopnse.body.current.feelslike,
            })
        }
    })
}

module.exports = forcast