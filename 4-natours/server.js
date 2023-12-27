const dotenv=require('dotenv')
const mongoose=require('mongoose')
dotenv.config({path:'./config.env'})

console.log(process.env)


const DB=process.env.DATABASE.replace('<PASSWORD>',process.env.DATABASE_PASSWORD)

mongoose.
//.connect(process.env.DATABASE_LOCAL) To connect with our local mongodb database
connect(DB,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useFindAndModify:false
}).then(()=>
    console.log('DB connection successful')
)

const tourSchema=mongoose.Schema({
    name:String,
    required:[true,'A tour must have a name'],
    unique:true
},
{
    rating:Number,
    default:4.5
},
{
    price:Number,
    required:[True,'A tour must have a price']
})

const Tour=mongoose.model('Tour',tourSchema)
//Create Server
const app=require('./app')

const port=process.env.port || 3000
app.listen(port,()=>{
console.log(`App running on port ${port}...`)
})