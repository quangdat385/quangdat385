const express = require('express')
const path = require('path')
const handlebars = require('express-handlebars')
const morgan = require('morgan')


const app = express()
const port = 3004
const hbs = handlebars.create({ extname: '.hbs' })
app.use(express.static(path.join(__dirname, 'public')))
app.use(morgan('combined'))

app.engine('.hbs', hbs.engine)
app.set('view engine', '.hbs')
app.set('views', path.join(__dirname, 'resources/views'))

console.log(path.join(__dirname, 'resources/views'))


//basic routing
//main routing
app.get('/', (req, res) => {
    console.log('abc')
    res.render('home')
})
//sub routing
app.get('/news', (req, res) => {
    
    res.render('news')
})

//query parameters(?q=asdas&ref=f8&)
app.get('/search', (req, res) => {
    console.log(req.query)
    res.render('search')
})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})