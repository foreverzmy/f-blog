import crypto from 'crypto'

import User from './mongoose/user'

let login = async function(ctx) {
  let { name, pwd } = ctx.request.body;
  const md5 = crypto.createHash('md5');
  pwd = md5.update(pwd).digest('hex');
  const user = await User.getByName(name);
  // 检查用户是否存在
  if (user === null) {
    ctx.flash.set({ error: 'Username does not exist' });
    return ctx.redirect('/login');
  }
  if (user.pwd !== pwd) {
    ctx.flash.set({ error: 'wrong password!' });
    return ctx.redirect('/login');
  }
  ctx.session.user = user;
  ctx.flash.set({ success: 'login success.' })
  return ctx.redirect('/');
}

export default login