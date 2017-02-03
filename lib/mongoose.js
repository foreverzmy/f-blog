import mongoose from 'mongoose'

import settings from './settings'

const promise = new mongoose.Promise();
mongoose.connect(`mongodb://localhost/${settings.db}`);

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: String,
  pwd: String,
  email: String
});

const UserModel = mongoose.model('User', UserSchema);

class UserOpera {
  constructor() {
    this.User = UserModel;
  }

  async save(user, callback) {
    let newUser = new this.User(user);
    await newUser.save(callback);
    mongoose.disconnect();
  }

  async getByName(name) {
    const user = await this.User.findOne({ name: name });
    return user;
    mongoose.disconnect();
  }

}

export default new UserOpera();