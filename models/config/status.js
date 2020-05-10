const Status = (sequelize, DataTypes ) => {
  return sequelize.define('status', {
  status: {
    type: DataTypes.STRING(200), 
    allowNull: false,
  },
  code: {
    type: DataTypes.INTEGER, 
    allowNull: false,
  },
  }
  )}

export default Status