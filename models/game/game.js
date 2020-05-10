const Game = (sequelize, DataTypes ) => {
  return sequelize.define('game', {
  status: {
    type: DataTypes.STRING(200), 
    allowNull: true,
  },
  owner: {
    type: DataTypes.STRING(200), 
    allowNull: true,
  },
  }
  )}

export default Game