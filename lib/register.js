import crypto from 'crypto'

import User from './mongoose/user'

let register = async function(ctx) {
  let { name, pwd, pwdRepeat, email } = ctx.request.body;
  if (pwd !== pwdRepeat) {
    ctx.flash.set({ error: 'The two passwords are not the same！' });
    return ctx.redirect('/register');
  } else {
    const md5 = crypto.createHash('md5');
    pwd = md5.update(pwd).digest('hex');

    let newUser = {
      name: name,
      pwd: pwd,
      email: email
    }
    await passSame(ctx, newUser);
  }
}

async function passSame(ctx, newUser) {
  const user = await User.getByName(newUser.name);
  if (user) {
    ctx.flash.set({ error: 'username already exist.' });
    return ctx.redirect('/register');
  } else {
    return await save(ctx, newUser);
  }
};

async function save(ctx, newUser) {
  let user;
  try {
    user = await User.save(newUser);
  } catch (err) {
    ctx.flash.set({ error: err });
    return ctx.redirect('/register');
  }
  ctx.session.user = newUser.name;
  ctx.flash.set({ success: 'Register success.' });
  return ctx.redirect('/');
}


export default register