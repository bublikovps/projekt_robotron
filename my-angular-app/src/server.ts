import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express from 'express';
import { join } from 'node:path';

const browserDistFolder = join(import.meta.dirname, '../browser');

const app = express();
const angularApp = new AngularNodeAppEngine();

/**
 * Proxy-Konfiguration für API-Anfragen an das Spring-Boot-Backend.
 * Die Ziel-URL wird über die Umgebungsvariable BACKEND_URL gesteuert.
 */
const backendUrl = process.env['BACKEND_URL'] || 'http://localhost:8080';

app.use('/api', async (req, res) => {
  try {
    const targetUrl = `${backendUrl}${req.originalUrl}`;
    const headers = new Headers();

    for (const [key, value] of Object.entries(req.headers)) {
      if (value && key.toLowerCase() !== 'host') {
        headers.set(key, Array.isArray(value) ? value.join(', ') : value);
      }
    }

    const hasBody = !['GET', 'HEAD'].includes(req.method.toUpperCase());
    const bodyBuffer = hasBody
      ? await new Promise<Buffer>((resolve, reject) => {
          const chunks: Buffer[] = [];
          req.on('data', (chunk) => chunks.push(Buffer.from(chunk)));
          req.on('end', () => resolve(Buffer.concat(chunks)));
          req.on('error', reject);
        })
      : undefined;

    const backendResponse = await fetch(targetUrl, {
      method: req.method,
      headers,
      body: bodyBuffer ? new Uint8Array(bodyBuffer) : undefined,
    });

    res.status(backendResponse.status);
    backendResponse.headers.forEach((val, key) => {
      if (key.toLowerCase() !== 'transfer-encoding') {
        res.setHeader(key, val);
      }
    });

    const responseBuffer = Buffer.from(await backendResponse.arrayBuffer());
    res.send(responseBuffer);
  } catch (err) {
    console.error('[SSR API Proxy Error]:', err);
    res.status(502).json({ error: 'Backend service unavailable' });
  }
});

/**
 * Statische Dateien aus dem Verzeichnis /browser ausliefern
 */
app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  }),
);

/**
 * Alle übrigen Anfragen über Angular Server-Side Rendering (SSR) verarbeiten
 */
app.use((req, res, next) => {
  angularApp
    .handle(req)
    .then((response) => (response ? writeResponseToNodeResponse(response, res) : next()))
    .catch(next);
});

/**
 * Startet den Express-Server, wenn dieses Modul der Haupteinstiegspunkt ist.
 * Standardmäßig wird Port 4000 verwendet (überschreibbar über die Umgebungsvariable PORT).
 */
if (isMainModule(import.meta.url) || process.env['pm_id']) {
  const port = process.env['PORT'] || 4000;
  app.listen(port, (error) => {
    if (error) {
      throw error;
    }
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

/**
 * Request-Handler für Angular CLI (Dev-Server und Build)
 */
export const reqHandler = createNodeRequestHandler(app);
