import Router from 'koa-router'

const router = new Router();

router.get('/', async ctx => {
  console.log(ctx.session)
  ctx.state = {
    title: '主页',
    user: ctx.session.user,
    success: ctx.flash.get('success'),
    error: ctx.flash.get('error')
  };
  await ctx.render('index', {});
});

export default router