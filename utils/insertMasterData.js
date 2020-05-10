import {processLineByLine} from './dbFunc'

const uploadFandom = (models, filePath, fandomId) => {
  return processLineByLine(filePath, models, 'fandom', fandomId)
}

const uploadCharacters = (models, filePath, fandomId) => {
  processLineByLine(filePath, models, 'character', fandomId)
}

const uploadLocation = (models, filePath, fandomId) => {
  processLineByLine(filePath, models, 'location', fandomId)
}

export { uploadCharacters, uploadFandom, uploadLocation }


