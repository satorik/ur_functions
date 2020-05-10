const Raiting = (sequelize, DataTypes ) => {
  return sequelize.define('raiting', {
  name_rus: {type: DataTypes.ENUM('G', 'PG', 'PG-13', 'R', 'NC-17')},
  name_eng: {type: DataTypes.ENUM('G', 'PG', 'PG-13', 'R', 'NC-17')},
  name_orig: {type: DataTypes.ENUM('G', 'PG', 'PG-13', 'R', 'NC-17')}
  }
  )}

  export default Raiting