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

/**
 * Return single note.
 */
router.get('/notes/:id', async (ctx, next) => {
  const id = parseInt(ctx.params.id) || 0;
  const data = await db.find({id});

  if (data) {
    ctx.body = data; // 200 if ok.  204 returned if no data, 404 if not found.
  } else {
    ctx.status = 404;
  }
});

/**
 * Return all notes.
 */
router.get('/notes', async (ctx, next) => {
  const data = await db.filter({});
  ctx.body = data;
});


/**
 * Perform upset (PUT) according to HTTP specification.
 */
router.put('/notes', koaBody(), async (ctx) => {
    const data = ctx.request.body;
    await db.upsert(data);
    ctx.body = ctx.request.body;
  }
);

/**
 * Delete individual note.
 */
router.delete('/notes/:id', async (ctx, next) => {
  const id = parseInt(ctx.params.id);
  await db.delete(id);
  ctx.status = 200;
});

/**
 * Initialize and clear all notes.
 */
router.delete('/notes', async (ctx, next) => {
  await db.init();
  ctx.body = "";
});



// Startup koa and it's middleware
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