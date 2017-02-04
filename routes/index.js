import Router from 'koa-router'

import getArticles from '../lib/index'

const router = new Router();

router.get('/', async ctx => {
  let articles = await getArticles(ctx);
  console.log('3')
  ctx.state = {
    title: '主页',
    user: ctx.session.user,
    success: ctx.flash.get('success'),
    error: ctx.flash.get('error'),
    arcs: articles
  };
  await ctx.render('index', {});
});

export default router