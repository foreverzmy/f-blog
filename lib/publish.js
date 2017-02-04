import Article from './mongoose/article'

let publish = async function(ctx) {
  const currentUser = ctx.session.user.name;
  let { title, main } = ctx.request.body;
  let article = new Article(currentUser, title, main);
  let savedArticle = null;
  try {
    savedArticle = await article.save();
  } catch (err) {
    ctx.flash.set({ error: err });
  }
  ctx.flash.set({ success: 'publish success.' });
  return ctx.redirect('/');
}

export default publish