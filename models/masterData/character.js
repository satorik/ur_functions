const Character = (sequelize, DataTypes ) => {
  return sequelize.define('character', {
  name_RUS: {
    type: DataTypes.STRING(200), 
    allowNull: false,
    validate:{
      notEmpty:{
          args:true,
          msg:"Name Rus required"
      },
      len:{
          args:[1, 100],
          msg:"Maximum 200 characters"
      }
    }
  },
  name_ENG: {
    type: DataTypes.STRING(200), 
    allowNull: true,
    validate:{
      len:{
          args:[1, 100],
          msg:"Maximum 200 characters"
      }
    }
  },
  name_ORIG: {
    type: DataTypes.STRING(200), 
    allowNull: true,
    validate:{
      len:{
          args:[1, 100],
          msg:"Maximum 200 characters"
      }
    }
  },
  isMain: {type: DataTypes.BOOLEAN},
  isGeneralName: {type: DataTypes.BOOLEAN},
  isSecondaryName:{type: DataTypes.BOOLEAN},
  tip_RU: {
    type: DataTypes.STRING(1000), 
    allowNull: true,
  },
  tip_ENG: {
    type: DataTypes.STRING(1000), 
    allowNull: true,
  },
  }
  )}

export default Character