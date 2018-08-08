const Koa = require('koa');
const Router = require('koa-router'); // Provide routing based on URL
const serve = require('koa-static'); // server static HTML, Images, JS and CSS
const cors = require('koa-cors');
const send = require('koa-send');
const app = new Koa();
const router = new Router();

router.get('/api/note/:id', async (ctx, next) => {
  console.log('got my endpoint');
  ctx.body = {id: ctx.params.id, name: 'paul', age: 21, date: new Date()};
});

// Send some test data
router.get('/api/notes', async (ctx, next) => {
  await send(ctx, 'data/notes.json');
});

try {
  app
    .use(cors())
    .use(router.routes())
    .use(router.allowedMethods())
    .use(serve('../notes-ui/dist')) // serve the built UI - dev use webpack server
    .listen(3200);
  console.log('Koa listening at http://localhost:3200');
} catch (error) {
  console.log('Koa did not start', error);
}