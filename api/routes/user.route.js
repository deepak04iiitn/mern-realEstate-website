import express from 'express';
import { deleteUser, getUserListings, test , updateUser , getUser } from '../controllers/user.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();


{/* req is the data that we get from client side and res is the data we send back from the server side */}

router.get('/test' , test);
router.post('/update/:id' ,verifyToken , updateUser);
router.delete('/delete/:id' ,verifyToken , deleteUser);
router.get('/listings/:id' , verifyToken , getUserListings);
router.get('/:id' , verifyToken , getUser);

export default router;