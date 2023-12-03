const express=require('express')
const userController=require('./../controllers/usercontroller')


const router=express.Router()
router.route('/api/v1/users').get(userController.getUsers).post(userController.createUsers).patch(userController.updateUsers).delete(userController.deleteUsers)

module.exports=router


