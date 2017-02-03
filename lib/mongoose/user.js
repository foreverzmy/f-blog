import mongoose from 'mongoose'

import settings from '../settings'

mongoose.Promise = global.Promise;
mongoose.connect(`mongodb://localhost/${settings.db}`);

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: String,
  pwd: String,
  email: String
});

const User = mongoose.model('User', UserSchema);

class UserOpera {
  constructor() {}

  async save(user) {
    let newUser = new User(user);
    await newUser.save();
    mongoose.disconnect();
  }

  async getByName(name) {
    const user = await User.findOne({ name: name });
    return user;
    mongoose.disconnect();
  }

}

export default new UserOpera();