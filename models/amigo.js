'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Amigo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Amigo.init({
    nome: {type: DataTypes.STRING, allowNull: false},
    email: {type: DataTypes.STRING, allowNull: false}
  }, {
    sequelize,
    modelName: 'Amigo',
  });

  Amigo.associate = (models) => {
    Amigo.hasMany(models.Jogo, { foreignKey: 'amigoId', as: 'jogos' });
    Amigo.hasMany(models.Emprestimo, { foreignKey: 'amigoId', as: 'emprestimos' }); 
  }

  return Amigo;
};