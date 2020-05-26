import path from 'path'
import readline from 'readline'
import fs from 'fs'
import { models } from '../models'
import {uploadCharacters, uploadLocation, uploadFandom} from './insertMasterData'

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
    if (fandomLine[6] === '1') fandoms.push(fandomLine) 
  }

  return fandoms
}

const syncDir = async () => {

  const fandomPath = path.resolve(rootPath, 'fandoms.csv')

  const fandomsArray = await readFandomFile(fandomPath)

  console.log('uploadFandom', fandomsArray)
}    

export default syncDir