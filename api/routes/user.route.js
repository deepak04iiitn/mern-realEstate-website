import express from 'express';
import { test } from '../controllers/user.controller.js';

const router = express.Router();


{/* req is the data that we get from client side and res is the data we send back from the server side */}

router.get('/test' , test);

export default router;