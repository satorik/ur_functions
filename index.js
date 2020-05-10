import db from './models'
import syncDir from './utils/uploadFandom'

db.sync()
  .then( () => {
    syncDir()
  })
