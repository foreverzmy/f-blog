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

mongoose.model('User', UserSchema);
let UserModel = mongoose.model('User');

class UserOpera {
  constructor() {
    this.User = UserModel;
  }

  async save(user, callback) {
    let newUser = new this.User(user);
    await newUser.save(callback);
    mongoose.disconnect();
  }

  async getByName(name, callback) {
    await this.User.find({ 'name': name }, (err, user) => {
      if (err) callback(err);
      callback(null, user[0]);
    });
    mongoose.disconnect();
  }

}

export default new UserOpera();