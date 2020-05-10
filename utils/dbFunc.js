import readline from 'readline'
import fs from 'fs'


const insertCharacters = (name, models, fandomId) => {
  let name_rus = name
  let main = false

  if (name.substr(0, 1) === '!') {
    name_rus = name.substr(1, name.length-1)
    main = true
  }

  return models.character.create({
    name_rus,
    fandomId,
    main
  })
}


const insertLocation = (name, models, fandomId) => {
  return models.location.create({
    name_rus: name,
    fandomId: fandomId
  })
}

const insertFandom = async (name, models) => {

  const fandom = await models.fandom.findOne({where: {name_rus: name}})
  if (!fandom ) return models.fandom.create({ name_rus: name})
  else {
    console.log('dbFunc', 'deleting ', fandom.dataValues.id)
    await models.character.destroy({where: {fandomId: fandom.dataValues.id}})
    await models.location.destroy({where: {fandomId: fandom.dataValues.id}})
    return fandom
  }
}

const uploadFunctions =  {
  'character': (name, models, fandomId) => insertCharacters(name, models, fandomId),
  'location': (name, models, fandomId) => insertLocation(name, models, fandomId),
  'fandom': (name, models) => insertFandom(name, models),
}


export const processLineByLine = async (filePath, models, type, fandomId) => {

  const fileStream = fs.createReadStream(filePath)

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  })

  for await (const line of rl) {

    if (type === 'fandom') {
      return uploadFunctions[type](line, models, fandomId)
    }
    else await uploadFunctions[type](line, models, fandomId)
  }
}