const jwt = require('jsonwebtoken');
const asyncHandler = require("express-async-handler");
const User = require('../models/usersmodel.js');

const protect = asyncHandler(async(req , res) =>{

    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
             
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            req.user = await User.findById(decoded.id).select('-password');

            next();

        } catch (error) {
            console.log(error);
            res.status(401)
            throw new Error('Acceso no autorizado, No fue proporcionado ningun token');
        }
    }

    if (!token) {
        res.status(401);
        throw new Error('Acceso no autorizado')
    }
});

module.exports = { protect }