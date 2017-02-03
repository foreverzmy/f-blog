import Koa from 'koa'
import Router from 'koa-router'
import logger from 'koa-logger'
import views from 'koa-views'
import favicon from 'koa-favicon'
import convert from 'koa-convert'
import bodyparser from 'koa-bodyparser'
import statc from 'koa-static'
import session from 'koa-session'
import flash from 'koa-flash-simple'

import settings from './lib/settings'
import sess from './lib/sessionsetting'
import { checkLogin, checkNotLogin } from './lib/checkLog'

import index from './routes/index'
import login from './routes/login'
import register from './routes/register'
import publish from './routes/publish'
import logout from './routes/logout'

const app = new Koa();
const router = new Router();

app.keys = [settings.cookieSecret];

const CONFIG = {
  key: 'koa:sess',
  maxAge: 86400000,
  httpOnly: true,
  signed: true,
};

app
  .use(convert(favicon(`${__dirname}/public/favicon.ico`)))
  .use(convert(bodyparser()))
  .use(convert(session(CONFIG, app)))
  .use(flash())
  .use(convert(logger()))
  .use(convert(statc(__dirname + '/public')))
  .use(views(`${__dirname}/views`, {
    extension: 'jade'
  }))
  .use(router.routes())
  .use(router.allowedMethods())

router
  .use('/', index.routes()) // 首页
  .use('/login', checkLogin, login.routes()) // 用户登录
  .use('/register', checkLogin, register.routes()) // 用户注册
  .use('/publish', checkNotLogin, publish.routes()) // 发表文章
  .use('/logout', checkNotLogin, logout.routes()) // 登出

app.on('error', function(err, ctx) {
  console.log(err)
  logger.error('server error', err, ctx);
});

export default app;