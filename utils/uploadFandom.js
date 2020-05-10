import { readdirSync } from 'fs'
import path from 'path'
import { models } from '../models'
import {uploadCharacters, uploadLocation, uploadFandom} from './insertMasterData'


const rootPath =  path.resolve(__dirname, '../txt/') 

const getDirectories = source =>
  readdirSync(source, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)

const syncDir = () => {
  const fandomDirs = getDirectories(rootPath)

  for (let dir of fandomDirs) {
    const fandomPath = path.resolve(__dirname, '../txt/', dir)
    const fandomNamePath = path.resolve(fandomPath, 'fandom.txt')
    const characterPath = path.resolve(fandomPath, 'characters.txt')
    const locationPath = path.resolve(fandomPath, 'locations.txt')

    uploadFandom(models, fandomNamePath, '').then (res => {
      console.log('uploadFandom', res.dataValues.id)
      uploadCharacters(models, characterPath, res.dataValues.id)
      uploadLocation(models, locationPath, res.dataValues.id)
    })

  }


}    

export default syncDir