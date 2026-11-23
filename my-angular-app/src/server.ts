import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { join } from 'node:path';

const browserDistFolder = join(import.meta.dirname, '../browser');

const app = express();
const angularApp = new AngularNodeAppEngine();

/**
 * Proxy-Konfiguration für API-Anfragen an das Spring-Boot-Backend.
 * Die Ziel-URL wird über die Umgebungsvariable BACKEND_URL gesteuert.
 */
const backendUrl = process.env['BACKEND_URL'] || '';

app.use(
  '/api',
  createProxyMiddleware({
    target: backendUrl,
    changeOrigin: true,
    // Express entfernt das Präfix '/api' bei app.use('/api', ...), daher wird es hier wieder hinzugefügt
    pathRewrite: (path) => `/api${path}`,
  }),
);

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
