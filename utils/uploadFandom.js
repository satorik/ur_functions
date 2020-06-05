import path from 'path'
import readline from 'readline'
import fs from 'fs'
import { insertAdaptationType, insertCategory, insertAdaptation, insertFandom, updateAdaptation, insertCharacter, insertArtefact } from './dbFunc'

const rootPath =  path.resolve(__dirname, '../txt/') 

const createReadStream = filePath => {
  const fileStream = fs.createReadStream(filePath)

  return readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  })
}

const readFandomFile = async filePath => {
  const fandoms = []
  for await (const line of createReadStream(filePath)) {
    const fandomLine = line.split(',')
    if (fandomLine[11] === '1') fandoms.push(fandomLine) 
  }

  return fandoms
}

const readCharacterFile = async filePath => {
  const characters = []
  for await (const line of createReadStream(filePath)) {
    const characterLine = line.split('\t')
    characters.push(characterLine)
  }
  return characters.slice(2)
}


const syncDir = async () => {

  const fandomPath = path.resolve(rootPath, 'fandoms.csv')
  const fandomsArray = await readFandomFile(fandomPath)
  const fandoms = {}

  for (const fandomLine of fandomsArray) {

    const category = {
      name_RUS: fandomLine[5],
      name_ENG: fandomLine[4]
    } 
    
    const createdCategory = await insertCategory(category)

    const adaptationType = {
      name_RUS: fandomLine[7],
      name_ENG: fandomLine[6],
      fandomCategoryId: createdCategory.id
    } 

    const createdAdaptationType = await insertAdaptationType(adaptationType)

    const adaptation = {
      name_RUS: fandomLine[3],
      name_ENG: fandomLine[2],
      name_ORIG: fandomLine[1],
      isFandom: false, 
      isAdaptation: true,
      adaptationTypeId: createdAdaptationType.id
    }

    const createdAdaptation = await insertAdaptation(adaptation)

    const index = fandomLine[0].split('_')[0]

    if (!fandoms[index]) fandoms[index] = {
      name_ORIG: fandomLine[8], 
      name_RUS: fandomLine[9], 
      name_ENG: fandomLine[10], 
      adaptation:[createdAdaptation.id]}
    else  fandoms[index].adaptation.push(createdAdaptation.id)

  }

  for (const index in fandoms) {
    const fandom = {
      name_RUS: fandoms[index].name_RUS,
      name_ENG: fandoms[index].name_ENG,
      name_ORIG: fandoms[index].name_ORIG,
      isFandom: true, 
      isAdaptation: false,
    }

    const createdFandom = await insertFandom(fandom)

    for (const adaptationId of fandoms[index].adaptation){
      await updateAdaptation(adaptationId, createdFandom.id)
    }

    const characterPath = path.resolve(rootPath, index+'_c.tsv')
    if (!fs.existsSync(characterPath)) console.log('character file not found')
    else {
      const characterArray = await readCharacterFile(characterPath)
      const generalNames = []

      for (const characterLine of characterArray) {
        const character = {
          name_RUS: characterLine[2],
          name_ENG: characterLine[1],
          name_ORIG: characterLine[0],
          tip_RU: characterLine[3],
          tip_ENG: characterLine[4],
          isMain: characterLine[5]==='1',
          isGeneralName: characterLine[6]==='',
          isSecondaryName: characterLine[6]!=='',
          fandomId: createdFandom.id,
          characterId: null,
        }
        if (character.isSecondaryName) {
          const generalName = generalNames.find(name => name.name_RUS === characterLine[6])
          if (!generalName) console.log('generalName not found')
          else character.characterId = generalName.id
        }
        const createdCharacter = await insertCharacter(character)
        if (character.isGeneralName) generalNames.push(createdCharacter.dataValues)      
      }

      const locationPath = path.resolve(rootPath, index+'_l.tsv')
      if (!fs.existsSync(locationPath)) console.log('location file not found')
      else {
        const locationArray = await readCharacterFile(locationPath)

        for (const locationLine of locationArray) {
          const location = {
            name_RUS: locationLine[2],
            name_ENG: locationLine[1],
            name_ORIG: locationLine[0],
            artefactType: 'location',
            fandomId: createdFandom.id,
          }

          await insertArtefact(location)
        }
      }

    }

    

  }

}    

export default syncDir
//0-index
//1-adaptation origin
//2-adaptation eng
//3-adaptation rus
//4-category eng
//5-category rus
//6-adaptation type eng
//7-adaptation type rus
//8-fandom orig
//9-fandom rus
//10-fandom eng
//11-status


//0 - name orig
//1 - name eng
//2 - name rus
//3 - tip rus
//4 - tip eng
//5 - main
//6 - main name