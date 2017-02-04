import Article from './mongoose/article'

async function getArticles(ctx) {
  let article = new Article();
  let arcs;
  try {
    arcs = await article.get()
  } catch (err) {
    ctx.flash.set({ error: err });
    return ctx.redirect('/');
  };
  console.log(arcs);
  return arcs;
}

export default getArticles