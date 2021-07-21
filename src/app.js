const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

const app = express()
const port = process.env.PORT || 3000

// define path for express
const publicDirectoryPath = path.join(__dirname,'../public')
const viewPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//setup handle bar engine and location
app.set('view engine','hbs')
app.set('views',viewPath)
hbs.registerPartials(partialsPath)

//setup static directory
app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=>{
    res.render('index',{
        'title':'Weather',
        'name':'Nithin Saji'

    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        'title':'About',
        'name':'Nithin Saji'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        'title':'Help',
        'name':'Nithin Saji'
    })
})
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})
app.get('/help/*',(req,res)=>{
    res.render('404',{
        'title':'Help',
        'name':'Nithin Saji',
        'errorMessage':'Help Article Not Found'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        'title':'404',
        'name':'Nithin Saji ',
        'errorMessage':'Page Not Found'
    })
})

app.listen(port,()=>{
    console.log('server is up at port ' + port)
})
