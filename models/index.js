import  Sequelize from 'sequelize'
import path from 'path'

require('dotenv').config({ path: path.resolve(__dirname, '../../.env') })

//console.log('index', process.env.host)
const sequelize = new Sequelize(process.env.db, process.env.user, process.env.password, {
  host: process.env.host,
  dialect: 'postgres',
  dialectOptions: {
    useUTC: false,
  },
  schema: process.env.schema,
  logging: false //console.log
})

  const models = {
    fandom: sequelize.import('./masterData/fandom.js'),
    fandomCategory: sequelize.import('./masterData/category.js'),
    adaptationType: sequelize.import('./masterData/adaptationType.js'),
    character: sequelize.import('./masterData/character.js'),
    genre: sequelize.import('./masterData/genre.js'),
    artefact: sequelize.import('./masterData/artefact.js'),
    raiting: sequelize.import('./masterData/raiting.js'),
    trop: sequelize.import('./masterData/trop.js'),
    noun: sequelize.import('./masterData/noun.js'),

    game: sequelize.import('./game/game.js'),
    gameCondition: sequelize.import('./game/gameCondition.js'),

    status: sequelize.import('./config/status.js')
  }
  
  models.fandom.hasMany(models.character, { onDelete: 'cascade' })
  models.fandom.hasMany(models.artefact, { onDelete: 'cascade' })
  models.adaptationType.hasMany(models.fandom, {as: 'adaptationType'})
  models.fandom.hasOne(models.fandom, {as: 'fandom'})
  models.fandomCategory.hasMany(models.adaptationType, {as: 'category'})
  models.character.hasMany(models.character, {as: 'mainCharacter'})

  models.game.hasMany(models.gameCondition, {as: 'Conditions'})

 export { models, sequelize as default }


