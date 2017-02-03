// 已登录
async function checkLogin(ctx, next) {
  if (ctx.session.user !== null) {
    ctx.flash.set({ error: 'already login.' });
    ctx.redirect('back');
  }
  await next();
}
// 未登录
async function checkNotLogin(ctx, next) {
  if (ctx.session.user === null) {
    ctx.flash.set({ error: 'not login.' });
    ctx.redirect('back');
  }
  await next();
}

export { checkLogin, checkNotLogin }