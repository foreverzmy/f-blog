import Article from './mongoose/article'

let publish = async function(ctx) {
  const currentUser = ctx.session.user;
  let { title, main } = ctx.request.body;
  let article = new Article(currentUser, title, main);
  try {
    let arc = await article.save();
  } catch (err) {
    ctx.flash.set({ error: err });
    return ctx.redirect('/');
  }
  ctx.flash.set({ success: 'publish success.' });
  return ctx.redirect('/');
}

export default publish