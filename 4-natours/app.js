const { create } = require('domain')
const express=require('express')
// const fs=require('fs')
const app=express()

const tourRouter=require('./starter/routes/tourRoutes')
const userRouter=require('./starter/routes/userRoutes')


//Middleware
app.use(express.json())

app.use(express.static(`${__dirname}/starter/public`));

app.use((req,res,next)=>{
    console.log('Hello fro middleware!')
    next()
})

app.use((req,res,next)=>{
    req.requestTime=new Date().toISOString();
    next()
})

app.use('/api/v1/tours',tourRouter)
app.use('/api/v1/users',userRouter)

// app.get('/',(req,res)=>{
//     res.status(200).
//     json({message:'Hello from the server side!',app:'Natours'})
// })

// app.post('/',(req,res)=>{
//     res.send('You can post to this endpoint')
// })

module.exports=app


