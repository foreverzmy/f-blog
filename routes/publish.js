import Router from 'koa-router'

import publish from '../lib/publish'

const router = new Router();

router.get('/', async(ctx, next) => {
  ctx.state = {
    title: '注册',
    user: ctx.session.user,
    success: ctx.flash.get('success'),
    error: ctx.flash.get('error')
  };
  await ctx.render('publish', {});
  await next();
});

router.post('/', async(ctx, next) => {
  await publish(ctx);
  await next();
})

export default router