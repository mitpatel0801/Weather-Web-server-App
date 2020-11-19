//All dependencies 
const express = require('express');
const path = require('path');
const hbs = require('hbs');
//These depandencies are Made by me
const geoCode = require('./Utility/GeoCode');
const forcast = require('./Utility/forcast');

const app = express();
const port = process.env.PORT || 3000;

//Paths
const publicPath = path.join(__dirname, '../public')
const tampletPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setup for hbs
app.set('view engine', 'hbs')
app.set('views', tampletPath)
hbs.registerPartials(partialsPath)

//for static page 
app.use(express.static(publicPath))

//Default Web Page
app.get('', (req, res) => {
    res.render('index', {
        title: "Weather",
        name: 'Mit Patel'
    })

})

//Input:user must provide query (eg. address=canada) for this method.
//Output:This method will return object of the weather information. If someone call this method with wrong address
//        or empty string this method will return the object with error field.
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({ error: "You must provide an Address" });
    }

    geoCode(req.query.address, (error, data) => {
        if (error) {
            return res.send({ error });
        }

        forcast(data.longitude, data.latitude, (error, forcastData) => {
            if (error) {
                return res.send({ error });
            }
            res.send({
                location: data.properAddress,
                temperature: forcastData.temperature,
                feelsLike: forcastData.feelslike,
                humidity: forcastData.humidity,
            })
        })
    })
})

//About web-page
app.get('/about', (req, res) => {
    res.render('about', {
        title: "About",
        name: 'Mit Patel'
    })
})

//Help web-page
app.get('/help', (req, res) => {
    res.render('help', {
        title: "Help",
        name: 'Mit Patel'
    })
})

//If someone send wrong http request from help web-page
app.get('/help/*', (req, res) => {
    res.render('404page', {
        error: 'help artical is not found'
    })
})


//if someone send wrong http request from default web-page
app.get('*', (req, res) => {
    res.render('404page', {
        error: 'Page not found'
    })
})


app.listen(port, () => {
    console.log("Local Host is running on " + port);
})