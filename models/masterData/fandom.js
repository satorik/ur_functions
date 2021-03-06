const Fandom = (sequelize, DataTypes ) => {
  return sequelize.define('fandom', {
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
  isAdaptation: {type: DataTypes.BOOLEAN},
  isFandom: {type: DataTypes.BOOLEAN},
  }
  )}

  export default Fandom