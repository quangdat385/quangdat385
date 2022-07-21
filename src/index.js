const express = require('express')
const path = require('path')
const handlebars = require('express-handlebars')
const morgan = require('morgan')
const connect = require('../src/config/db')
const methodOverride = require('method-override')



const app = express()
const port = 3005
const route= require('./routes')
const hbs = handlebars.create({ 
    extname: '.hbs',
    helpers:{sum:(a,b) =>a+b,}
})
app.use(methodOverride('_method'))


app.use(express.static(path.join(__dirname, 'public')))

app.use(morgan('combined'))
app.use(express.urlencoded({
    extended:true
}))//xu ly dnag fom
app.use(express.json())//su ly dang axios

app.engine('.hbs', hbs.engine)
app.set('view engine', '.hbs')
app.set('views', path.join(__dirname, 'resources/views'))

//Routes init
route(app)

connect
    .then(()=>{
        console.log('Connected to DB')
        app.listen(port, () => {
            console.log(`Example app listening on port ${port}`)
        })
    })
    .catch(err => {
        console.log('err',err)
    })


