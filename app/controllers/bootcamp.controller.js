const db = require('../models');
const Bootcamp = db.Bootcamps;
const User = db.users;

//CREAR BOOTCAMP
exports.createBootcamp = (req, res) => {
    const bootcamp = {
        title: req.body.title,
        cue: req.body.cue,
        description: req.body.description,
    };

    Bootcamp.create(bootcamp)
  .then((bootcamp) => {
    console.log(`bootcamp creado exitosamente: ${JSON.stringify(bootcamp, null,4)}`);
    res.status(201).json(bootcamp);
  })
  .catch((err) =>{
    console.log(`error al crear Bootcamp: ${err}`);
    res.status(500).json({ message: 'error al crear Bootcamp'});
  });
};


// AGREGAR NUEVO USUARIO
exports.addUser = (req, res) => {
    const bootcampId = req.params.bootcampId;
    const userId = req.params.userId;


    Bootcamp.findByPk(bootcampId)
    .then((bootcamp) => {
        if (!bootcamp) {
            console.log("Bootcamp no encontrado");
            return res.status(404).json({ message: 'Bootcamp no encontrado' });
        }

        User.findByPk(userId).then((user) => {
            if(!user) {
                console.log("No se encontro el usuario");
                return res.status(404).json({ message: 'No se encontro el usuario' });
            }

            bootcamp.addUser(user);
            console.log(`Usuario agregado exitosamente id=${user.id} a Bootcamp con id=${bootcamp.id}`);
            res.status(200).json(bootcamp);
        });
    })

    .catch((err) => {
        console.log("error al agregar usuario al bootcamp", err);
        res.status(500).json({ message: "error al agregar usuario al bootcamp" });
    });
};





//BUSCAR BOOTCAMP POR ID


exports.findById = (req, res) => {
    const Id = req.params.id;

    Bootcamp.findByPk(Id, {
        include: [
            {
                model: User,
                as: 'users',
                attributes: ['id', 'firstName', 'lastName'],
                through: {
                    attributes: [],
             },
            },
        ],
    })
    .then((bootcamp) => {
        if (!bootcamp) {
          console.log(`bootcamp con id=${Id} no ha sido encontrado`);
          return res.status(404).json({ message: 'Bootcamp no ha sido encontrado' });
        }
  
        res.status(200).json(bootcamp);
      })
      .catch((err) => {
        console.log(`Error al encontrar bootcamp: ${err}`);
        res.status(500).json({ message: 'Error al encontrar bootcamp' });
      });


};


// OBTENER TODOS LOS USUARIOS Y LOS BOOTCAMP
exports.findAll = (req, res) => {
    Bootcamp.findAll({
      include: [
        {
          model: User,
          as: 'users',
          attributes: ['id', 'firstName', 'lastName'],
          through: {
            attributes: [],
          },
        },
      ],
    })
      .then((bootcamps) => {
        res.status(200).json(bootcamps);
      })
      .catch((err) => {
        console.log('>> Error buscando los Bootcamps: ', err);
        res.status(500).json({ message: 'Error buscando los Bootcamps' });
      });
  };