import http from 'node:http';
import { readFile, realpath, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.ico': 'image/x-icon',
};

export function createStaticServer(root) {
  const rootPath = path.resolve(root);
  const inside = candidate => {
    const relative = path.relative(rootPath, candidate);
    return relative !== '..' && !relative.startsWith('..' + path.sep) && !path.isAbsolute(relative);
  };
  return http.createServer(async (req, res) => {
    const reply = (code, text) => {
      res.writeHead(code, {'Content-Type': 'text/plain; charset=utf-8'});
      res.end(req.method === 'HEAD' ? undefined : text);
    };
    if (!['GET', 'HEAD'].includes(req.method)) {
      res.setHeader('Allow', 'GET, HEAD');
      return reply(405, 'Method not allowed');
    }
    let pathname;
    try { pathname = decodeURIComponent((req.url ?? '/').split(/[?#]/, 1)[0]); }
    catch { return reply(400, 'Bad request'); }
    if (!pathname.startsWith('/') || /[\\\0]/.test(pathname)) return reply(400, 'Bad request');
    if (pathname.split('/').some(part => part.startsWith('.'))) return reply(403, 'Forbidden');
    const filename = path.resolve(rootPath, '.' + (pathname === '/' ? '/index.html' : pathname));
    if (!inside(filename)) return reply(403, 'Forbidden');
    try {
      const resolved = await realpath(filename);
      if (!inside(resolved)) return reply(403, 'Forbidden');
      const info = await stat(resolved);
      if (!info.isFile()) return reply(404, 'Not found');
      const body = req.method === 'HEAD' ? undefined : await readFile(resolved);
      res.writeHead(200, {
        'Content-Type': MIME[path.extname(filename)] ?? 'application/octet-stream',
        'Content-Length': info.size,
        'Cache-Control': 'no-cache',
        'X-Content-Type-Options': 'nosniff',
      });
      res.end(body);
    } catch (error) {
      reply(['ENOENT', 'ENOTDIR', 'EISDIR'].includes(error.code) ? 404 : 500, 'File unavailable');
    }
  });
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const root = fileURLToPath(new URL('../dist/', import.meta.url));
  const port = Number(process.env.PORT ?? 4173);
  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    console.error('PORT 必须是 1 到 65535 之间的端口号。');
    process.exit(1);
  }
  const server = createStaticServer(root);
  server.on('error', error => {
    console.error(error.code === 'EADDRINUSE' ? `端口 ${port} 已被占用，请设置 PORT 后重试。` : error.message);
    process.exitCode = 1;
  });
  server.listen(port, '127.0.0.1', () => {
    console.log(`核心防线 · 合成战场\n本地地址：http://127.0.0.1:${port}\n按 Ctrl+C 停止。`);
  });
}
