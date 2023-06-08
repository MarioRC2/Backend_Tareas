const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware.js');
const {getTareas , setTarea, updateTarea, deleteTarea} = require('../Controllers/tareasControllers.js');

router.route('/').get(protect, getTareas).post(protect, setTarea)
//router.get('/', getTarea);
//router.post('/', setTarea);

router.route('/:id').delete(protect, deleteTarea).put(protect, updateTarea);
//router.put('/:id', updateTarea);
//router.delete('/:id', deleteTarea)




module.exports = router;