import db from './models'
import syncDir from './utils/uploadFandom'

db.sync()
  .then( async () => {
     await db.models.fandom.sync({force: true})
     await db.models.character.sync({force: true})
     await db.models.fandomCategory.sync({force: true})
     await db.models.adaptationType.sync({force: true})
     await db.models.artefact.sync({force: true})
    syncDir()
  })
