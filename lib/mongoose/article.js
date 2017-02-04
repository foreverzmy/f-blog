import mongoose from 'mongoose'

import settings from '../settings'

const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
  name: String,
  time: Object,
  title: String,
  main: String
});

const Article = mongoose.model('Article', ArticleSchema);

class ArticleOpera {
  constructor(name, title, main) {
    this.name = name;
    this.title = title;
    this.main = main;
  }

  async save() {
    let date = new Date();
    // 存储各种时间格式
    let time = {
      date: date,
      year: date.getFullYear(),
      month: `${date.getFullYear()}-${date.getMonth()+1}`,
      day: `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`,
      minute: `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()<10?'0'+date.getMinutes():date.getMinutes()}`
    }
    let article = {
      name: this.name,
      time: time,
      title: this.title,
      main: this.main
    }
    let newArticle = new Article(article);
    await newArticle.save();
    await mongoose.disconnect();
  }

  async get(name) {
    const article = await Article.find(name);
    return article;
    mongoose.disconnect();
  }
}

export default ArticleOpera;