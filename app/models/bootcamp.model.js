module.exports = (sequelize, DataTypes) => {
  const Bootcamp = sequelize.define('bootcamp', {
    title: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'El nombre es requerido',
        },
      },
    },


    
    cue: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          args: true,
          msg: 'numero de Cue requerido',
        },
        isInt: {
          args: true,
          msg: 'Introducir número entero',
        },
        max: 20,
        min: 5,
      },
    },


    description: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Se debe introducir una descripción',
        },
      },
    },
  });











  return Bootcamp;
};