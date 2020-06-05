import {models} from '../models'

const insertCharacter = characterLine => {
  return models.character.create(characterLine)
}


const insertArtefact = artefactLine => {
  return models.artefact.create(artefactLine)
}

const insertFandom = async (fandomLine) => {
  const fandom = await models.fandom.findOne({where: {name_RUS: fandomLine.name_RUS, isFandom: true}})
  if (!fandom ) return models.fandom.create(fandomLine)

}

const insertAdaptation = async (fandom) => {
  const adaptation = await models.fandom.findOne({where: {name_RUS: fandom.name_RUS, adaptationTypeId: fandom.adaptationTypeId}})
  if (!adaptation) return models.fandom.create(fandom)
  else return adaptation
}

const insertCategory = async (categoryLine) => {
 const category = await models.fandomCategory.findOne({where: {name_RUS: categoryLine.name_RUS}})
 if (!category) return models.fandomCategory.create(categoryLine)
 else return category

}

const insertAdaptationType = async (adaptationTypeLine) => {
 const adaptationType = await models.adaptationType.findOne({where: {name_RUS: adaptationTypeLine.name_RUS, fandomCategoryId: adaptationTypeLine.fandomCategoryId}})
 if (!adaptationType) return models.adaptationType.create(adaptationTypeLine)
 else return adaptationType
}

const updateAdaptation = async(id, fandomId) => {
  const adaptation = await models.fandom.findByPk(id)
  adaptation.fandomId = fandomId
  adaptation.save()
}

// const uploadFunctions =  {
//   'character': (name, models, fandomId) => insertCharacters(name, models, fandomId),
//   'location': (name, models, fandomId) => insertLocation(name, models, fandomId),
//   'fandom': (name, models) => insertFandom(name, models),
// }


// export const processLineByLine = async (filePath, models, type, fandomId) => {

//   const fileStream = fs.createReadStream(filePath)

//   const rl = readline.createInterface({
//     input: fileStream,
//     crlfDelay: Infinity
//   })

//   for await (const line of rl) {

//     if (type === 'fandom') {
//       return uploadFunctions[type](line, models, fandomId)
//     }
//     else await uploadFunctions[type](line, models, fandomId)
//   }
// }

export {insertCategory, 
  insertAdaptationType, 
  insertFandom, 
  insertAdaptation, 
  updateAdaptation, 
  insertCharacter, 
  insertArtefact}