const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware.js');
const {crearUsuario, loginUsuario, misDatos} = require('../Controllers/userControllers.js')

router.post('/', crearUsuario);
router.post('/login', loginUsuario);
router.get('/me', protect , misDatos);
module.exports = router;