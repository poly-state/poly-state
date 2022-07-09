---
id: redux-devtools
title: Redux DevTools
slug: /redux-devtools
sidebar_label: Redux DevTools
---

# Redux DevTools

It is possible to debug store changes using the Redux DevTools. It can be used as a browser extension (for Chrome, Edge and Firefox), as a standalone app or as a React component integrated in the client app.

## Enable DevTools

We have a middleware to enable Redux DevTools on your store. Your store should be wrapped with `withDevTools`, otherwise the it will not work as expected. Here `Counter Store` is a store identifier for the Redux DevTools.

```jsx {5}
import { createStore, withDevTools } from '@poly-state/poly-state';
import { useStore } from '@poly-state/react';

const counterStore = createStore({ count: 0 });
withDevTools(counterStore, 'Counter Store');

const useCounterStore = () => useStore(counterStore);
```

## Conditionally Enable

```jsx {5-7}
import { createStore, withDevTools } from '@poly-state/poly-state';
import { useStore } from '@poly-state/react';

const counterStore = createStore({ count: 0 });
if (process.env.NODE_ENV === 'development') {
	withDevTools(counterStore, 'Counter Store');
}

const useCounterStore = () => useStore(counterStore);
```

## Install Redux DevTools

### 1. For Chrome

- from [Chrome Web Store](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd);
- or download `extension.zip` from [last releases](https://github.com/zalmoxisus/redux-devtools-extension/releases), unzip, open `chrome://extensions` url and turn on developer mode from top left and then click; on `Load Unpacked` and select the extracted folder for use
- or build it with `npm i && npm run build:extension` and [load the extension's folder](https://developer.chrome.com/extensions/getstarted#unpacked) `./build/extension`;
- or run it in dev mode with `npm i && npm start` and [load the extension's folder](https://developer.chrome.com/extensions/getstarted#unpacked) `./dev`.

### 2. For Firefox

- from [Mozilla Add-ons](https://addons.mozilla.org/en-US/firefox/addon/reduxdevtools/);
- or build it with `npm i && npm run build:firefox` and [load the extension's folder](https://developer.mozilla.org/en-US/Add-ons/WebExtensions/Temporary_Installation_in_Firefox) `./build/firefox` (just select a file from inside the dir).

### 3. For Electron

- just specify `REDUX_DEVTOOLS` in [`electron-devtools-installer`](https://github.com/GPMDP/electron-devtools-installer).

### 4. For other browsers and non-browser environment

- use [`remote-redux-devtools`](https://github.com/zalmoxisus/remote-redux-devtools).

For more information, see [Redux DevTools](https://github.com/reduxjs/redux-devtools/tree/main/extension) documentation.
