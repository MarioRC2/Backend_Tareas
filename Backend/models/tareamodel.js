const mongoose = require('mongoose');

const tareaSchemas = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    texto:{ 
        type : String,
        required:[true, 'Escribe el texto de la tarea']
    }
},
{
timestamps : true
});

module.exports = mongoose.model('tarea', tareaSchemas);