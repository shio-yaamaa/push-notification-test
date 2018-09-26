This website sends push notifications to your device when the firebase function receives an HTTP request.

# Frequently Used Commands

- Generating keys: `web-push generate-vapid-keys`
- Watching TS files for auto-compilation: `npm run watch`
- Deployment of Firebase Functions: in `firebase-functions/functions`, `npm run deploy`

# Unsubscribing

```javascript
navigator.serviceWorker.ready.then(registration =>
  registration.pushManager.getSubscription().then(subscription =>
    subscription.unsubscribe().then(() =>
      console.log('Unsubscribed!')
    )
  )
);
```

or unregister the service worker

# Directory Structure

```
README.md: Documentation for myself

index.html: The main page

js/: Stores JS files compiled from TS files
  bundle.js: The script file imported by the main HTML page
ts/: TS files that are used to create JS files
  script.ts: The main script that runs in the browser
  sw.ts: Service worker script
  Others: Modules imported to these two main scripts
sw.js: The compiled service worker script; Need to be here to cover the global scope

tsconfig.json: Just to provide a dummy 'files' property to suppress the error
webpack.config.js: Webpack settings

firebase-functions/: Works as a server that receives HTTP requests and sends push notifications to the registered devices
  functions/
    src/
      index.ts: Script that runs on the firebase functions
```

# Issues

## `files` option required when using ts-loader with webpack

Problem:

Though webpack determines which files to compile based on the dependency tree, ts-loader still complains about the lack of `files` option in `tsconfig.json`.

Workaround:

Provide a `tsconfig.json` with a dummy `files` option 笑.

```json
{
  "files": ["dummy"]
}
```

Discussions:

https://github.com/TypeStrong/ts-loader/issues/405

https://github.com/Microsoft/TypeScript/issues/12762

https://github.com/Microsoft/TypeScript/issues/26803

## `ServiceWorker` lib not provided

Problem:

Though `WebWorker` lib is provided and working fine, there are additional variable declarations needed for Service Worker scripts. For instance, `self` should be of type `ServiceWorkerGlobalScope`, but `WebWorker` lib defines `self` as `WebWorker`.

Workaround:

For `self`,

```typescript
declare var self: ServiceWorkerGlobalScope;

or

(self as ServiceWorkerGlobalScope)
```

To access global-scope variables like `clients`,

```typescript
declare var clients: Clients;

or

(self as ServiceWorkerGlobalScope).clients
```

Discussions:

https://github.com/Microsoft/TypeScript/issues/11781

https://github.com/Microsoft/TSJS-lib-generator/issues/505

## Can't resolve 'fs' in a node module

Workaround:

Add

```javascript
node {
  fs: 'empty'
}
```

to the webpack configuration.