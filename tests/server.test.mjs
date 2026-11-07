import test from 'node:test';
import assert from 'node:assert/strict';
import http from 'node:http';
import { once } from 'node:events';
import { fileURLToPath } from 'node:url';
import { createStaticServer } from '../scripts/serve.mjs';

const root = fileURLToPath(new URL('../dist/', import.meta.url));

async function withServer(run) {
  const server = createStaticServer(root);
  server.listen(0, '127.0.0.1');
  await once(server, 'listening');
  const base = `http://127.0.0.1:${server.address().port}`;
  try { await run(base); }
  finally { await new Promise(resolve => server.close(resolve)); }
}

test('local server delivers the actual game and JavaScript modules with correct MIME types', async () => {
  await withServer(async base => {
    const page = await fetch(base + '/');
    assert.equal(page.status, 200);
    assert.match(page.headers.get('content-type'), /text\/html/);
    assert.match(await page.text(), /核心防线/);
    for (const path of ['/game.js', '/model.js', '/software-renderer.js', '/vendor/three.module.js', '/vendor/three.core.js']) {
      const module = await fetch(base + path);
      assert.equal(module.status, 200, path);
      assert.match(module.headers.get('content-type'), /javascript/);
      assert.ok((await module.text()).length > 100);
    }
    const css = await fetch(base + '/style.css?version=1');
    assert.equal(css.status, 200);
    assert.match(css.headers.get('content-type'), /text\/css/);
  });
});

test('HEAD returns metadata without a body and missing files return 404', async () => {
  await withServer(async base => {
    const head = await fetch(base + '/game.js', {method: 'HEAD'});
    assert.equal(head.status, 200);
    assert.ok(Number(head.headers.get('content-length')) > 100);
    assert.equal(await head.text(), '');
    assert.equal((await fetch(base + '/missing.js')).status, 404);
    assert.equal((await fetch(base + '/vendor/')).status, 404);
    assert.equal((await fetch(base + '/', {method:'POST'})).status, 405);
  });
});

function rawRequest(base, path) {
  return new Promise((resolve, reject) => {
    const req = http.get(base, {path}, res => {res.resume(); res.on('end', () => resolve(res.statusCode));});
    req.on('error', reject);
  });
}

test('local server cannot expose files outside the game directory', async () => {
  await withServer(async base => {
    for (const path of ['/../package.json', '/%2e%2e/package.json', '/..%5cpackage.json', '/.git/config', '/%00', '/%zz']) {
      const status = await rawRequest(base, path);
      assert.ok(status === 400 || status === 403, `${path}: ${status}`);
    }
  });
});
