const express = require('express');
const router = express.Router();
const bootcampController = require('../controllers/bootcamp.controller');
const userController = require('../controllers/user.controller');
const verificacion = require('../middleware/login')



// *RUTAS BOOTCAMP*


// CREAR BOOTCAMP
router.post('/bootcamps', verificacion, bootcampController.createBootcamp);


// AGREGAR USUARIO
router.post('/bootcamps/:bootcampId/users/:userId', bootcampController.addUser);



// BUSCAR BOOTCAMP POR ID
router.get('/bootcamps/:id', verificacion, bootcampController.findById);



// BUSCAR TODOS LOS BOOTCAMP CON USUARIOS
router.get('/bootcamps', bootcampController.findAll);







// *RUTAS USUARIOS*



// CREAR USUARIO
router.post('/users', userController.createUser);



// BUSCAR USUARIO PO ID
router.get('/users/:id', userController.findUserById);



// BUSCAR TODOS LOS USUARIOR CON BOOTCAMP
router.get('/users',verificacion, userController.findAll);



// ACTUALIZAR USUARIO POR ID
router.put('/users/:id', userController.updateUserById);



// ELIMINAR USUARIO POR ID
router.delete('/users/:id', userController.deleteUserById);



//LOGIN

router.post('/login', verificacion, userController.login)

module.exports = router;