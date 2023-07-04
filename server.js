const express = require('express')
const mongoose = require('mongoose')
const app = express()

const PORT = process.env.PORT || 3001

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))

app.use(require('./routes'))

mongoose.connect(process.env.MONODB_URI || 'mongodb://localhost/mongogogo', {
    useCreateIndex: true,
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindandModify: false
})

mongoose.set('debug', true)

app.listen(PORT, ()=> console.log(`Connected on localhost:${PORT}`))

