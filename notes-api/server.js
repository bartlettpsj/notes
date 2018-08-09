// Configuration
const API_PORT = 3200;
const API_ENDPOINT = 'api';

const Koa = require('koa');
const Router = require('koa-router'); // Provide routing based on URL
const serve = require('koa-static');  // server static HTML, Images, JS and CSS
const cors = require('koa-cors');     // Allow Cross Domain Requests
const koaBody = require('koa-body');  // Extract JSON from body
const app = new Koa();
const router = new Router({ prefix: `/${API_ENDPOINT}`});
const db = require('./dbaccess');

router.get('/notes/:id', async (ctx, next) => {
  const id = parseInt(ctx.params.id) || 0;
  const data = await db.find({id});
  ctx.body = data;// || {}; // 204 returned if no data
});

// Send some test data
router.get('/notes', async (ctx, next) => {
  const data = await db.filter({});
  ctx.body = data;
});


// performs upset (PUT) according to HTTP specification
router.put('/notes', koaBody(), async (ctx) => {
    const data = ctx.request.body;
    await db.upsert(data);
    ctx.body = ctx.request.body;
  }
);

router.delete('/notes/:id', async (ctx, next) => {
  const id = parseInt(ctx.params.id);
  await db.delete(id)
});

try {
  app
    .use(cors())
    .use(router.routes())
    .use(router.allowedMethods())
    .use(serve('../notes-ui/dist')) // serve the built UI - dev use webpack server
    .listen(API_PORT);
  console.log(`Koa listening at http://localhost:${API_PORT}/${API_ENDPOINT}`);
} catch (error) {
  console.log('Koa did not start', error);
}