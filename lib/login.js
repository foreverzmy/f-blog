import crypto from 'crypto'

import mongo from './user'

let login = async function(ctx) {
  const md5 = crypto.createHash('md5');
}

export default login