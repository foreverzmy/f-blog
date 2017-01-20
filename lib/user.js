import Mongolass from 'mongolass'

import settings from './settings'

const mongolass = new Mongolass();
mongolass.connect(`mongodb://localhost/${settings.db}`);

const Schema = Mongolass.Schema;

const UserSchema = new Schema('UserSchema', {
  name: { type: 'string' },
  pwd: { type: 'string' },
  email: { type: 'string' }
});

const User = mongolass.model('User', UserSchema);

class UserOpera {
  constructor() {}

  async save(user, callback) {
    await User.insertOne(user)
      .then(callback(null, user.name))
      .catch(function(err) {
        callback(err);
      });
  }

  async getByName(name, callback) {
    User.find()
      .select({ name: name })
      .then(callback(null, name))
  }

}

export default new UserOpera();