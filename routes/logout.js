import Router from 'koa-router'

const router = new Router();

router.get('/', ctx => {
  ctx.session.user = null;
  ctx.flash.set({ success: 'logout success.' });
  ctx.redirect('/');
});

export default router