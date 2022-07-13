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




app.get('/', (req, res) => {

    res.render('home')
})
app.get('/news', (req, res) => {

    res.render('news')
})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})