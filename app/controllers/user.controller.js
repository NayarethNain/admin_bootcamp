//const { Bootcamp, User } = require('../models');
const db = require('../models');
const Bootcamp = db.bootcamps;
const User = db.users;
const jwt = require('jsonwebtoken');
const key = require('../config/key')




// CREAR USUARIO 



exports.createUser = (req, res) => {
  const user = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
  };

  User.create(user)
    .then((user) => {
      console.log(`Usuario creado con exito: ${JSON.stringify(user, null, 4)}`);
      res.status(201).json(user);
    })
    .catch((err) => {
      console.log(`error al crear usuario: ${err}`);
      res.status(500).json({ message: 'error al crear usuario' });
    });
};





// BUSCAR USUARIO POR ID


exports.findUserById = (req, res) => {
  const Id = req.params.id;

  User.findByPk(Id, {
    include: [
      {
        model: Bootcamp,
        as: 'bootcamps',
        attributes: ['id', 'title', 'cue', 'description'],
        through: {
          attributes: [],
        },
      },
    ],
  })
    .then((user) => {
      if (!user) {
        console.log(`El usuario con id=${Id} no ha sido encontrado`);
        return res.status(404).json({ message: 'El usuario no ha sido encontrado' });
      }

      res.status(200).json(user);
    })
    .catch((err) => {
      console.log(`error al econtrar al usuario: ${err}`);
      res.status(500).json({ message: 'error al econtrar al usuario' });
    });
};





// OBTENER TODOS LOS USUARIOS Y BOOTCAMP
exports.findAll = (req, res) => {
  User.findAll({
    include: [
      {
        model: Bootcamp,
        as: 'bootcamps',
        attributes: ['id', 'title', 'cue', 'description'],
        through: {
          attributes: [],
        },
      },
    ],
  })
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((err) => {
      console.log('usuarios no encontrados ', err);
      res.status(500).json({ message: 'Error al encontrar a los usuarios' });
    });
};




//ACTUALIZAR USUARIOS POR ID
exports.updateUserById = (req, res) => {
  const Id = req.params.id;
  const { firstName, lastName } = req.body;

  User.update(
    { firstName, lastName },
    {
      where: { id: Id },
    }
  )
    .then((num) => {
      if (num[0] === 1) {
        console.log(`El usuario con id=${Id} ha sido actualizado con exito`);
        res.status(200).json({ message: 'El usuario ha sido actualizado con exito' });
      } else {
        console.log(`El usuario con id=${Id} no ha sido encontrado`);
        res.status(404).json({ message: 'El usuario no ha sido encontrado' });
      }
    })
    .catch((err) => {
      console.log(`Error al actualizar el usuario: ${err}`);
      res.status(500).json({ message: 'Error al actualizar el usuario' });
    });
};




// ELIMINAR USUARIOS POR ID


exports.deleteUserById = (req, res) => {
  const Id = req.params.id;

  User.destroy({
    where: { id: Id },
  })
    .then((num) => {
      if (num === 1) {
        console.log(`El usuario con id=${Id} ha sido eliminado con exito`);
        res.status(200).json({ message: 'El usuario ha sido eliminado con exito' });
      } else {
        console.log(`El usuario con id=${Id} no ha sido encontrado`);
        res.status(404).json({ message: 'El usuario no ha sido encontrado' });
      }
    })
    .catch((err) => {
      console.log(`Error al eliminar usuario: ${err}`);
      res.status(500).json({ message: 'Error al eliminar usuario' });
    });
};






//LOGIN 
//user = admin
// pass= 12345


exports.login = (req, res) => {
  
  if (req.body.user === 'admin' && req.body.pass === '12345') {
    const payload = {
      check: true
    };
    const token = jwt.sign(payload, key.key, {
      expiresIn: '30m'
    });
    res.json({
      message: 'Autenticación exitosa',
      token: token
    });
  } else {
    res.json({
      message: 'Usuario o password incorrectos'
    });
  };
};