const mongoose = require("mongoose");

const userSchemas = mongoose.Schema(
   {
      name: {
         type: String,
         required: [true, "Por favor teclea tu Nombre"],
      },
      email: {
         type: String,
         required: [true, "Por favor teclea tu Email"],
         unique: true,
      },
      password: {
         type: String,
         required: [true, "Por favor teclea tu Password"],
      },
   },
   {
      timestamps: true,
   }
);


module.exports = mongoose.model('User',userSchemas);