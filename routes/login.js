import Router from 'koa-router'

const router = new Router();

router.get('/', async ctx => {
  ctx.state = {
    title: '登录'
  };
  await ctx.render('login', {});
});

router.post('/', ctx => {

})

export default router