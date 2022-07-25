const mongoose = require('mongoose')
const URI='mongodb://localhost:27017/f8_education_dev'


const connect =mongoose.connect(URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useFindAndModify: false
})

module.exports = connect