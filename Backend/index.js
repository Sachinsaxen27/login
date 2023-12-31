const database=require('./database')
database()

const express=require('express')
const cors=require('cors')

const app=express()
const port=5000
app.use(cors(({ origin: 'http://localhost:3000', credentials: true })))
app.use(express.json({limit:"10mb",extended:true}))
app.use(express.urlencoded({limit:"10mb",extended:true,parameterLimit:50000}))

app.use('/api/userlogin',require('./data/Userlogin'))
app.listen(port,()=>{
    console.log(` App is listening at http://localhost:${port}`)
})