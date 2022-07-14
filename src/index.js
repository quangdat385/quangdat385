const express = require('express')
const path = require('path')
const handlebars = require('express-handlebars')
const morgan = require('morgan')


const app = express()
const port = 3004
const route= require('./routes')
const hbs = handlebars.create({ extname: '.hbs' })
app.use(express.static(path.join(__dirname, 'public')))
app.use(morgan('combined'))
app.use(express.urlencoded({
    extended:true
}))//xu ly dnag fom
app.use(express.json())//su ly dang axios

app.engine('.hbs', hbs.engine)
app.set('view engine', '.hbs')
app.set('views', path.join(__dirname, 'resources/views'))

route(app)




app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})