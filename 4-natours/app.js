const { create } = require('domain')
const express=require('express')
const fs=require('fs')
const app=express()


//Middleware
app.use(express.json())

app.use((req,res,next)=>{
    console.log('Hello fro middleware!')
    next()
})

app.use((req,res,next)=>{
    req.requestTime=new Date().toISOString();
    next()
})

// app.get('/',(req,res)=>{
//     res.status(200).
//     json({message:'Hello from the server side!',app:'Natours'})
// })

// app.post('/',(req,res)=>{
//     res.send('You can post to this endpoint')
// })

const tours=JSON.parse(fs.readFileSync(`${__dirname}/starter/dev-data/data/tours-simple.json`,'utf-8'))
console.log(tours)

//Route Handler Functions
const getAllTours=(req,res)=>{
    console.log(req.requestTime)
    res.status(200).json({
        status:'success',
        requestedAt:req.requestTime,
        results:tours.length,
        data:{
            tours
        }
    })
}

const getTour=(req,res)=>{
    console.log(req.params)

    const id=req.params.id*1 //Multiplying a string with number return number
    const tour=tours.find((el)=>el.id===id)

    if (!tour){
        return res.status(404).json({
            status:'fail',
            messsage:'INVALID ID'
        })
    }
    
    res.status(200).json({
        status:'success',
        data:tour
    })
}

const createTour=(req,res)=>{
    const newId=tours[tours.length-1].id+1
    const newTour=Object.assign({id:newId},req.body)

    tours.push(newTour)
    fs.writeFile(`${__dirname}/starter/dev-data/data/tours-simple.json`,JSON.stringify(tours),err=>{
        res.status(201).json({
            status:'success',
            data:{
                newTour
            }
        })
    })
}

const updateTour=(req,res)=>{
    if (req.params.id*1>tours.length){
        return res.status(404).json({
            status:'fail',
            messsage:'INVALID ID'
        })
    }
    res.status(200).json({
        status:'success',
        data:{
            tour:'<Updated tour here..>'
        }
    })
}

const deleteTour=(req,res)=>{
    if (req.params.id*1>tours.length){
        return res.status(404).json({
            status:'fail',
            messsage:'INVALID ID'
        })
    }
    res.status(204).json({
        status:'success',
        data:null
    })
}

const getUsers=(req,res)=>{
    res.status(500).json({
        status:'err',
        message:'This route is not yet defined'
    })
}

const createUsers=(req,res)=>{
    res.status(500).json({
        status:'err',
        message:'This route is not yet defined'
    })
}

const updateUsers=(req,res)=>{
    res.status(500).json({
        status:'err',
        message:'This route is not yet defined'
    })
}

const deleteUsers=(req,res)=>{
    res.status(500).json({
        status:'err',
        message:'This route is not yet defined'
    })
}


//Routes

// app.get('/api/v1/tours',getAllTours)
// app.post('/api/v1/tours',createTour)

app.route('/api/v1/tours').get(getAllTours).post(createTour) //This is equivalent to the above two commented lines

// app.get('/api/v1/tours/:id',getTour)
// app.patch('/api/v1/tours/:id',updateTour)
// app.delete('/api/v1/tours/:id',deleteTour)

app.route('/api/v1/tours/:id').get(getTour).patch(updateTour).delete(deleteTour)
app.route('/api/v1/users').get(getUsers).post(createUsers).patch(updateUsers).delete(deleteUsers)


//Create Server


const port=3000
app.listen(port,()=>{
console.log(`App running on port ${port}...`)
})