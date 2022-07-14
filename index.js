const express = require('express')
const app = express()
const mongoose = require('mongoose')
const multer = require("multer");

let route = require('./routes/route')

app.use(express.json())

app.use(multer().any())

mongoose.connect("mongodb+srv://komalbansod_04:BdcyrSiZZa4v5y76@komal04.fvnel.mongodb.net/propelTheory?retryWrites=true&w=majority", {useNewUrlParser: true})
    .then(() => console.log('mongodb running on 27017'))
    .catch(err => console.log(err))

app.use('/', route)

app.listen(3000, 'localhost', ()=>{
    console.log("Server is runnig on port 3000");
})