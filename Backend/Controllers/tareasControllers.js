const asyncHandler = require("express-async-handler");
const tarea = require("../models/tareamodel");

const getTareas = asyncHandler(async (req, res) => {
   const Tarea = await tarea.find( {user: user.req.id} );
   res.status(200).json({ Tarea });
});

const setTarea = asyncHandler(async (req, res) => {
   if (!req.body.texto) {
      //res.status(400).json({message: 'Teclea una Tarea'});
      res.status(400);
      throw new Error("Porfavor Teclee un texto");
   }
   const Tarea = await tarea.create({
      texto: req.body.texto,
      user: req.user.id
   });
   res.status(201).json({ Tarea });
});


const updateTarea =asyncHandler(async(req , res) =>{
    const Tarea = await tarea.findById(req.params.id);

    if (!Tarea) {
        res.status(400);
        throw new Error("La Tarea no fue Encontrada");
    }

    if (tarea.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('Acceso no Autorizado')
    }
    
    const tareaUpdate = await tarea.findByIdAndUpdate(req.params.id, req.body, {new: true});

    res.status(200).json({ tareaUpdate });
});

const deleteTarea = asyncHandler(async (req, res) => {
    if (!tarea) {
        res.status(400)
        throw new Error('La tarea no fué encontrada')
    }

    if (tarea.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('Acceso no Autorizado')
    }

    await tarea.deleteOne()

    //await Tarea.findByIdAndDelete(req.params.id)

    res.status(200).json({ id: req.params.id })
});

module.exports = {
   getTareas,
   setTarea,
   updateTarea,
   deleteTarea,
};
