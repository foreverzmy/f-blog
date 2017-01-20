import settings from './settings'

async function setting(ctx, next) {
  if (ctx.path === '/favicon.ico') return;
  ctx.session = {
    name: settings.db,
    cookie: {
      maxAge: 1000 * 60 * 60 * 60 * 24 * 30
    }
  }
  await next();
}

export default setting