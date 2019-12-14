var path = require('path');
var fileName = path.basename(__filename);
import logger from "../../../utilities/Logger"


export default async function (next) {
  this.lastModifiedTime = Date.now()
  next()
}