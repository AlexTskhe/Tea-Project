'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
  Comment.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user',
      onDelete: 'CASCADE'
    });

  
    Comment.belongsTo(models.Tea, {
      foreignKey: 'teaId',
      as: 'tea',
      onDelete: 'CASCADE'
    });

    }
  }
  Comment.init({
    commentText: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    teaId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};