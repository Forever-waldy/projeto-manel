'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Jogo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Jogo.init({
    titulo: {type: DataTypes.STRING, allowNull: false},
    plataforma: {type: DataTypes.STRING, allowNull: false},
    amigoId: {type: DataTypes.INTEGER, allowNull: false}
  }, {
    sequelize,
    modelName: 'Jogo',
  });

  Jogo.associate = function (models) {
    Jogo.belongsTo(models.Amigo, { foreignKey: 'amigoId', as: 'dono' });
    Jogo.hasMany(models.Emprestimo, { foreignKey: 'jogoId', as: 'emprestimos' });
  };
  
  return Jogo;
};