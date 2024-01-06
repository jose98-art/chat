import {Router} from 'express'
// import { socketServer } from '../server.js'

const router = Router()
//con este endpoind podemos usar para mostrar el registro del producto en el momento
router.get('/',(req,res)=>{
    res.render('socket')
})


export default router