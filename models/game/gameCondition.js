const GameCondition = (sequelize, DataTypes ) => {
  return sequelize.define('gameCondition', {
  conditionType: {
    type: DataTypes.STRING(200), 
    allowNull: false,
  },
  conditionId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
  }
  )}

export default GameCondition