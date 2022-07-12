const express = require('express')
const app = express()
const port = 3004

app.get('/', (req, res) => {
    res.send('Hello World!123')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})