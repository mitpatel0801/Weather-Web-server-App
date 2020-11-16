const request = require('request')


//Input: It will take address and function with two parameter as it's parameter.
//Output: Use mapbox api to get longitude and latitude of particular address and call given function
//        with object that contain longitude and latitude and place name.
//Error: If it does not find address or can not connect to local server then It will return error.
const geocode = (address, callback) => {

    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoibWVldHBhdGVsODgzIiwiYSI6ImNraDlnenVoMTBzbWkyeGsxYWdzdGd3NXIifQ.7KdU214Id56p6cDTLQWeeA&limit=1';

    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback("Unable to connect local server", undefined);
        } else if (response.body.features.length === 0) {
            callback("Unable to find given location please give proper name", undefined);
        } else {

            callback(undefined, {
                longitude: response.body.features[0].center[1],
                latitude: response.body.features[0].center[0],
                properAddress: response.body.features[0].place_name,
            })
        }
    })
}

module.exports = geocode