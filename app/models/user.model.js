module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('users', {
    firstName: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Campo nombre es requerido',
        },
      },
    },
    lastName: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Campo apellido es requerido',
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'correo electrónico es requerido',
        },
        isEmail: {
          args: true,
          msg: 'Formato de correo no válido',
        },
      },
      unique: {
        args: true,
        msg: 'Correo electrónico actualmente registrado en la base de datos',
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [8],
          msg: 'Se requiere un mínimo de 8 caracteres para la contraseña (password)',
        },
        notNull: {
          msg: 'El password es requerido',
        },
        notEmpty: {
          msg: 'Debe ingresar una contraseña',
        },
      },
    },
  });

  return User;
};

