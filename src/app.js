const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

//Define paths for express config
const publicDirPath = path.join(__dirname,'../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname,'../templates/partials');

//Setup handlebards engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(publicDirPath));

app.get('', (req, res)=>{
    res.render('index', {
        title:'Index page',
        author:'iliyas1'
    });
})
app.get('/about', (req, res)=>{
    res.render('about',{
        title:'About title',
        location:'bengaluru',
        author:'iliyas2'
    })
})
app.get('/help', (req, res)=>{
    res.render('help', {
        title:'Help title',
        location: 'hyderabad',
        author:'iliyas3'
    })
})

app.get('/weather', (req, res)=>{
    if(!req.query.address){
        return res.send({
            error:'You must provide an address'
        })
    }
    geocode(req.query.address, (error, {latitude, longitude, location} ={})=>{
        if(error){
            return res.send({error: error});
        }
        forecast(latitude,longitude,(error, forecastData)=>{
            if(error){
                return res.send({error});//shorthand property for error
            }
            res.send({
                forecast:forecastData,
                location,
                address: req.query.address
            })
        })
    })

    // console.log(req.query.address);
    // res.send({
    //     forecast:'Its Snowing',
    //     address: req.query.address
    // })
    
})
app.get('/products', (req, res)=>{
    if(!req.query.search){
       return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search);
    res.send({
        products:[]
    })
})
app.get('/help/*', (req, res)=>{
    res.render('404',{
        title:'404Error',
        errorMessage:'Help article not found',
        author:'iliyas mohd',
    })
})
app.get('*',(req, res)=>{
    res.render('404',{
        title : '404Error',
        errorMessage:'page not found',
        author:'Iliyas Mohd',
    })
})

app.listen(3000, ()=>{
    console.log('Server listing up on port 3000');
})





// app.get('/about', (req, res)=>{
//     res.send('<h1>About Page</h1>');
// })
// app.get('/weather', (req, res)=>{
//     res.send([{
//         location:"newyork",
//         temparature: 22
//     },{
//         location:"bangalore",
//         temparature:20
//     }]);
// })