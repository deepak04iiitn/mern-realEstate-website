import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';

export const signup = async (req , res , next) => {

    const { username , email , password } = req.body;     /* hum log ye information client side ke body se laare h */

    const hashedPassword = bcryptjs.hashSync(password , 10);

    const newUser = new User({ username , email , password : hashedPassword });   /* creating a database */

    try {

        await newUser.save();        /*it will save the new user into the database*/

        res.status(201).json("User created successfully");

    } catch (error) {

        /* res.status(500).json(error.message); ---> but this is not the best way to handle errors , the best way is to have functions and middlewares */
        next(error);
        
    }

};