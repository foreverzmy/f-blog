import Article from './mongoose/article'

async function getArticles(ctx) {
  let article = new Article();
  let arcs;
  await article.get(null, (err, articles) => {
    if (err) {
      ctx.flash.set({ error: err });
      return ctx.redirect('/');
    }
    arcs = articles;
  });
  return arcs;
}

export default getArticles