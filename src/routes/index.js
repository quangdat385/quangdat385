const newsRouter= require('./news')
const express = require('express')

function route(app) {
    app.use(express.urlencoded({
        extended:true
    }))
    //basic routing
    //main routing
    // app.get('/', (req, res) => {
    // console.log('abc')
    // res.render('home')
    // })
    //sub routing
    app.use('/news', newsRouter)

    //query parameters(?q=asdas&ref=f8&)
    // app.get('/search', (req, res) => {
    //     console.log(req.query)
    //     res.render('search')
    // })
    //input phai co name moi gui dc submit
    // app.post('/search', (req, res) => {
    //     console.log(req.body)
    //     res.send('da gui')
    // })



}

module.exports=route;