# @baas-id/react

Identity verification for React apps: a guided ID photo (front and back) and a live face check, with on-device
quality gating, a verdict decided on the server, and an optional handoff to a phone.
**Requires a BaaS account** — sign up at [baaslatam.com](https://baaslatam.com) (14-day trial, sandbox included).

Verificación de identidad para apps React: foto guiada del documento (frente y reverso) y prueba de rostro en vivo,
con control de calidad en el dispositivo, veredicto decidido en el servidor y paso opcional al teléfono.
**Requiere una cuenta BaaS** — regístrate en [baaslatam.com](https://baaslatam.com) (prueba de 14 días con sandbox).

[Español](#español) · [English](#english)

---

## English

### Install

```bash
npm install @baas-id/react
# or straight from BaaS:
npm install https://baaslatam.com/sdk/baas-id-react-0.2.3.tgz
```

Peer dependencies: `react` and `react-dom` 18 or newer. TensorFlow.js is installed with the package.

### Quick start

```tsx
import { EnrollmentFlow } from "@baas-id/react";        // styles come with the import

export function Verify() {
  return (
    <EnrollmentFlow
      apiUrl="https://api.baaslatam.com"
      openSession={async (signal) => (await fetch("/api/baas/session", { method: "POST", signal })).json()}
      onVerified={(result) => fetch("/api/baas/verified", { method: "POST", body: result.verification_token })}
      onFailed={(reason, detail) => console.warn(reason, detail)}
    />
  );
}
```

Your **backend** opens the session (it holds the API key, never the browser) and returns the API's body unchanged:

```ts
const res = await fetch("https://api.baaslatam.com/v1/sessions", {
  method: "POST",
  headers: { "Content-Type": "application/json", "X-API-Key": process.env.BAAS_API_KEY },
  body: JSON.stringify({ purpose: "enrollment", subject_ref: user.id, nonce: crypto.randomUUID() }),
});
return res.json();   // keep `flow` whole: it binds every capture to the session
```

### Sandbox keys

In the BaaS console → your tenant → **Integration**, copy the **sandbox** key. Sandbox sessions run the full flow
and never bill. Switch to the live key when you go to production.

### Results

- `onVerified(result)`: the verdict was VERIFIED. Send `result.verification_token` (a signed JWS) to your backend
  and verify it there, offline, against the public keys at `https://api.baaslatam.com/.well-known/jwks.json` (Ed25519).
  Never trust a browser-side "verified" on its own.
- `onFailed(reason, detail)`: the flow ended without a verification. `reason` is a typed code; `detail` always
  carries `reason_title` and `reason_description` (the server's words when it sent them, else the SDK's, in the
  session's language), ready to show.
- `onEvent(event)`: progress events (`document.captured`, `face.captured`, `verification.completed`, …) for logging.

### Phone handoff

On a computer, the flow can offer to continue on a phone (QR code + link) when your tenant turns it on. The phone page
is hosted by BaaS at `https://baaslatam.com/c/{code}`, or on your own origin with
`import { ContinueFlow, readHandoffCode } from "@baas-id/react/continue"`. The computer still receives `onVerified`.

### Theming

Set any `--baas-id-*` CSS variable on a wrapping element: `--baas-id-accent`, `--baas-id-ink`,
`--baas-id-surface`, `--baas-id-radius`, `--baas-id-font`, … Derived shades follow your base colours automatically
(dark themes included). The look, step instructions and error wording can also be set per tenant in the console.

### Models

The on-device detectors download from the BaaS CDN (`https://baaslatam.com/sdk-models/…`, versioned, cached for a
year). To serve them yourself, pass `modelsUrl="/your/path"`.

### Other entries

- `@baas-id/react/continue` — the phone continue page only.
- `@baas-id/react/preview` — `FlowPreview`, a frozen screen for configuration UIs.
- `@baas-id/react/styles.css` — the stylesheet, if your setup needs it imported explicitly.

### Links

Docs: [baaslatam.com/developers](https://baaslatam.com/developers) · Licence: proprietary (BaaS, S.A.), see
`LICENSE.md` · Third-party notices: `THIRD_PARTY_NOTICES.md` · Sales: sales@reporting-pal.com · Support:
support@reporting-pal.com · Developed by Reporting Pal.

---

## Español

### Instalación

```bash
npm install @baas-id/react
# o directamente desde BaaS:
npm install https://baaslatam.com/sdk/baas-id-react-0.2.3.tgz
```

Dependencias *peer*: `react` y `react-dom` 18 o superior. TensorFlow.js se instala con el paquete.

### Inicio rápido

```tsx
import { EnrollmentFlow } from "@baas-id/react";        // los estilos vienen con el import

export function Verificar() {
  return (
    <EnrollmentFlow
      apiUrl="https://api.baaslatam.com"
      openSession={async (signal) => (await fetch("/api/baas/session", { method: "POST", signal })).json()}
      onVerified={(r) => fetch("/api/baas/verificado", { method: "POST", body: r.verification_token })}
      onFailed={(motivo, detalle) => console.warn(motivo, detalle)}
    />
  );
}
```

Tu **backend** abre la sesión (guarda la clave de API; el navegador nunca la ve) y devuelve el cuerpo de la API sin
cambios: `POST https://api.baaslatam.com/v1/sessions` con el encabezado `X-API-Key`. Conserva `flow` completo: vincula
cada captura con la sesión.

### Claves sandbox

En la consola de BaaS → tu tenant → **Integración**, copia la clave **sandbox**. Las sesiones sandbox recorren el
flujo completo y no se facturan. Cambia a la clave live al pasar a producción.

### Resultados

- `onVerified(result)`: el veredicto fue VERIFIED. Envía `result.verification_token` (un JWS firmado) a tu backend y
  verifícalo allí, sin conexión, con las claves públicas de `https://api.baaslatam.com/.well-known/jwks.json` (Ed25519).
  No confíes solo en un "verificado" del navegador.
- `onFailed(motivo, detalle)`: el flujo terminó sin verificación. `motivo` es un código; `detalle` siempre trae
  `reason_title` y `reason_description` (las palabras del servidor si las envió; si no, las del SDK, en el idioma de la
  sesión), listas para mostrar.
- `onEvent(evento)`: eventos de progreso para tus registros.

### Continuar en el teléfono

En una computadora, el flujo puede ofrecer continuar en el teléfono (código QR y enlace) si tu tenant lo activa. La
página del teléfono la aloja BaaS en `https://baaslatam.com/c/{code}`, o tu propio dominio con
`import { ContinueFlow, readHandoffCode } from "@baas-id/react/continue"`. La computadora recibe igual `onVerified`.

### Apariencia

Define cualquier variable `--baas-id-*` en un elemento contenedor (`--baas-id-accent`, `--baas-id-ink`,
`--baas-id-surface`, `--baas-id-radius`, `--baas-id-font`, …). Los tonos derivados siguen tus colores base (también
en temas oscuros). La apariencia, las instrucciones por paso y los mensajes de error también se configuran por tenant
en la consola.

### Modelos

Los detectores del dispositivo se descargan del CDN de BaaS (`https://baaslatam.com/sdk-models/…`, versionado, en
caché por un año). Para servirlos tú, pasa `modelsUrl="/tu/ruta"`.

### Enlaces

Documentación: [baaslatam.com/developers](https://baaslatam.com/developers) · Licencia: propietaria (BaaS,
S.A.), ver `LICENSE.md` · Avisos de terceros: `THIRD_PARTY_NOTICES.md` · Ventas: sales@reporting-pal.com · Soporte:
support@reporting-pal.com · Desarrollado por Reporting Pal.
