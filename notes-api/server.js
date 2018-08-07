const Koa = require('koa');
const Router = require('koa-router'); // Provide routing based on URL
const serve = require('koa-static'); // server static HTML, Images, JS and CSS
const app = new Koa();
const router = new Router();

router.get('/api', async (ctx, next) => {
  ctx.body = { name: 'paul', age: 21 };
});

try {
  app
    .use(router.routes())
    .use(router.allowedMethods())
    .use(serve('.'))
    .listen(3200);
  console.log('Koa listening at http://localhost:3200');
} catch (error) {
  console.log('Koa did not start', error);
}