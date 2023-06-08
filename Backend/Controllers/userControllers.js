const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../models/usersmodel.js");

const crearUsuario = asyncHandler(async (req, res) => {
   const { name, email, password } = req.body;
   if (!name || !email || !password) {
      res.status(400);
      throw new Error("Faltan Datos");
   }

   const userExist = await User.findOne({ email });
   if (userExist) {
      res.status(400);
      throw new Error("Ese Usuario ya Existe");
   }

   const salt = await bcrypt.genSalt(10);
   const hashedPassword = await bcrypt.hash(password, salt);

   const user = await User.create({
      name,
      email,
      password: hashedPassword,
   });

   if (user) {
      res.status(201).json({
         _id: user.id,
         name: user.name,
         email: user.email,
      });
   } else {
      res.status(400);
      throw new Error("Datos no Validos");
   }

   res.json({ crearUsuario });
});

const loginUsuario = asyncHandler(async (req, res) => {
   const { email, password } = req.body;

   const user = await User.findOne({ email });

   if (user && (await bcrypt.compare(password, user.password))) {
      res.status(200).json({
         _id: user.id,
         name: user.name,
         email: user.email,
         token : generateToken(user._id)
      });
   } else {
      throw new Error("Credenciales Incorrectas");
   }
});

const generateToken = (id) =>{
    return jwt.sign({id} , process.env.JWT_SECRET , {expiresIn : '30d'});
}

const misDatos = asyncHandler(async (req, res) => {
   res.json({ message: "Login" });
});

module.exports = {
   crearUsuario,
   loginUsuario,
   misDatos,
};
