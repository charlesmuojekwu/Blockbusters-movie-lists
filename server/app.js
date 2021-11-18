//imports
require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()
const port = process.env.PORT || 5000;

//middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static("uploads"))

//database connection
mongoose.connect(process.env.DB_URI,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useFindAndModify:true,
    useCreateIndex:true
})
    .then(() => { console.log ('Database connected')})
    .catch((err) => {console.log(err.message)})


//routes prefix
const routes = require('./routes/api')
app.use('/api/posts',routes)


if(process.env.NODE_ENV === 'production'){
    app.use(express.static(__dirname + '/dist/'))
    app.get('*',(req,res) => {
        res.sendFile(__dirname + "/dist/index.html")
    })
}


//start server
app.listen(port, () => { console.log( `Server running at http://localhost:${port}`) } )