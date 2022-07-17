const newsRouter= require('./news')
const siteRouter= require('./site')
const coursesRouter= require('./courses')
const meRouter= require('./me')


function route(app) {
    
    //basic routing
    //main routing
    // app.get('/', (req, res) => {
    // console.log('abc')
    // res.render('home')
    // })
    //sub routing
    app.use('/news', newsRouter)
    app.use('/courses',coursesRouter)
    app.use('/',siteRouter)
    app.use('/me',meRouter)
    


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