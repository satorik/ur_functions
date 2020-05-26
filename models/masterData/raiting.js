const Raiting = (sequelize, DataTypes ) => {
  return sequelize.define('raiting', {
  name_RUS: {type: DataTypes.ENUM('G', 'PG', 'PG-13', 'R', 'NC-17')},
  name_ENG: {type: DataTypes.ENUM('G', 'PG', 'PG-13', 'R', 'NC-17')},
  name_ORIG: {type: DataTypes.ENUM('G', 'PG', 'PG-13', 'R', 'NC-17')}
  }
  )}

  export default Raiting