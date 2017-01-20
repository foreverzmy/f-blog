import Router from 'koa-router'
import crypto from 'crypto'

import register from '../lib/register'

const router = new Router();

router.get('/', async(ctx, next) => {
  ctx.state = {
    title: '注册',
    user: ctx.session.user,
    success: ctx.flash.get('success'),
    error: ctx.flash.get('error')
  };
  await ctx.render('register', {});
  await next();
});

router.post('/', async(ctx, next) => {
  await register(ctx);
  await next();
})


export default router