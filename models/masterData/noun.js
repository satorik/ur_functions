const Noun = (sequelize, DataTypes ) => {
  return sequelize.define('noun', {
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
  }
  }
  )}

  export default Noun