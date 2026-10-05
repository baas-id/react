# Third-party notices / Avisos de terceros

`@baas-id/react` is proprietary (see `LICENSE.md`). It contains, or downloads at run time, the third-party components
below, which remain under their own licences. Their copyright and licence notices are preserved in the shipped files
(`@license` headers in `dist/esm/workers/*.js`).

`@baas-id/react` es propietario (ver `LICENSE.md`). Contiene, o descarga al ejecutarse, los componentes de terceros
siguientes, que conservan sus propias licencias. Sus avisos de copyright y licencia se conservan en los archivos
distribuidos.

## Bundled code (in `dist/esm/workers/detector.worker-*.js`)

The document detector runs in a Web Worker, which cannot resolve your app's imports, so the worker file bundles its
own copy of TensorFlow.js:

| Package | Version | Licence | Copyright |
|---|---|---|---|
| @tensorflow/tfjs (core, converter, backend-cpu, backend-webgl, layers, data) | 4.22.0 | Apache-2.0 (tfjs-layers: Apache-2.0 AND MIT) | Google LLC |
| seedrandom | 3.0.5 | MIT | David Bau |
| long | 4.0.0 | Apache-2.0 | Daniel Wirtz |

Apache License 2.0: https://www.apache.org/licenses/LICENSE-2.0 — MIT License: https://opensource.org/licenses/MIT

## Dependencies installed with the package (not bundled)

| Package | Licence |
|---|---|
| @tensorflow/tfjs ^4.22 | Apache-2.0 |
| @tensorflow-models/blazeface ^0.1 | Apache-2.0 |

Peer dependencies you provide: `react`, `react-dom` (MIT, Meta Platforms, Inc.).

## Models downloaded at run time

Served from `https://baaslatam.com/sdk-models/<version>/` (or your own `modelsUrl`):

| Folder | What it is | Licence |
|---|---|---|
| `face-detector` | BlazeFace short-range face detector (TensorFlow.js models) | Apache-2.0, Google LLC |
| `card-detector-q` | ID-card detector, trained by BaaS | BaaS proprietary (LICENSE.md §4) — **legal review: confirm the licence of any pre-trained base weights** |
| `side-classifier-q` | ID-card front/back classifier, trained by BaaS | BaaS proprietary — **legal review: confirm the licence of any pre-trained base weights** |
| `card-tinydet-r4` | Card corner + side detector, own architecture trained from scratch by BaaS | BaaS proprietary |

> Borrador para revisión legal — draft for legal review.
