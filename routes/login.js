import Router from 'koa-router'

import login from '../lib/login'

const router = new Router();

router.get('/', async ctx => {
  ctx.state = {
    title: '登录',
    user: ctx.session.user,
    success: ctx.flash.get('success'),
    error: ctx.flash.get('error')
  };
  await ctx.render('login', {});
});

router.post('/', async(ctx, next) => {
  await login(ctx);
  await next();
})

export default router