import readline from 'readline'
import fs from 'fs'

const createReadStream = filePath => {
  const fileStream = fs.createReadStream(filePath)

  return readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  })
}

export {createReadStream}