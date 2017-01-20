import crypto from 'crypto'

import mongo from './user'

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
  await mongo.getByName(newUser.name, (err, user) => {
    if (user) {
      ctx.flash.set({ error: 'username already exist.' });
      return ctx.redirect('/register');
    } else {
      return save(ctx, newUser);
    }
  });
}

async function save(ctx, newUser) {
  await mongo.save(newUser, (err, user) => {
    console.log('5')
    if (err) {
      ctx.flash.set({ error: err });
      return redirect('/register');
    }
    ctx.session.user = user;
    ctx.flash.set({ success: 'Register success.' });
    return ctx.redirect('/');
  })
}


export default register