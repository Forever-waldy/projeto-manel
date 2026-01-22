'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Emprestimo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Emprestimo.init({
    jogoId: {type: DataTypes.INTEGER, allowNull: false},
    amigoId: {type: DataTypes.INTEGER, allowNull: false},
    dataInicio: {type: DataTypes.STRING, allowNull: false},
    dataFim: {type: DataTypes.STRING, allowNull: false}
  }, {
    sequelize,
    modelName: 'Emprestimo',
  });

  Emprestimo.associate = function (models) {
    Emprestimo.belongsTo(models.Jogo, { foreignKey: 'jogoId', as: 'jogo' });
    Emprestimo.belongsTo(models.Amigo, { foreignKey: 'amigoId', as: 'amigo' });
  };
  
  return Emprestimo;
};