import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken';

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


export const signin = async (req , res , next) => {

    const { email , password } = req.body;     /* hum log ye information client side ke body se laare h */

    try {

        const validUser = await User.findOne({ email });                        /* searching for the entered email in our database , {email : email} --> since both key and value have same name so we can delete one */
        if(!validUser) return next(errorHandler(404 , "User not found!"));

        const validPassword = bcryptjs.compareSync(password , validUser.password);
        if(!validPassword) return next(errorHandler(401 , "Wrong credentials!"));

        const token = jwt.sign({ id : validUser._id } , process.env.JWT_SECRET );

        const { password : pass , ...rest } = validUser._doc;           /* we are removing the password before sending it back to the user */

        res.cookie('access_token' , token , {httpOnly:true})
        .status(200)
        .json(rest);                                               /* we are displaying everything except password */

    } catch (error) {

        /* res.status(500).json(error.message); ---> but this is not the best way to handle errors , the best way is to have functions and middlewares */
        next(error);
        
    }

};