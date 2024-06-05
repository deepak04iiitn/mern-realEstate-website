import express from 'express';
import { test, updateUser } from '../controllers/user.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();


{/* req is the data that we get from client side and res is the data we send back from the server side */}

router.get('/test' , test);
router.post('/update/:id' ,verifyToken , updateUser);

export default router;