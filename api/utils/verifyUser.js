import { errorHandler } from "./error.js";
import jwt from 'jsonwebtoken';

export const verifyToken = (req , re , next) => {
    const token = req.cookies.access_token;

    if(!token) return next(errorHandler(401 , 'Unauthorized'));

    jwt.verify(token , process.env.JWT_SECRET , (err , user) => {
        if(err) return next(errorHandler(403 , 'Forbidden'));

        req.user = user;
        next();

    })

}