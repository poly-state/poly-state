---
id: hooks-api
title: Hooks API
slug: /hooks-api
sidebar_label: Hooks API
---

## createStoreHooks

`createStoreHooks` - **`Function`** - Takes in a store instance and returns the following Tuple :

```ts
// T is the type of the store
createStoreHooks = <T>(store: ReturnStoreType<T>) [UseStore<T>, UseStoreSelector<T>]
```

Use case:
Instead of using `useStore` and `useStoreSelector` hooks, you can use `createStoreHooks` to create a custom hook.

```jsx
import { createStoreHooks } from '@poly-state/react';

const counterStore = createStore({ count: 0 });
const [useCounterStore, useCounterSelector] = createStoreHooks(counterStore);

// way to use
const { count } = useCounterStore();
const count = useCounterSelector('count');
```

## useStore

`useStore` - **`React Hook`** - Takes in a store instance and returns a stateful value of the store.

```jsx
import { useSelector } from '@poly-state/react';

const counterStore = createStore({ count: 0 });
const useCounterStore = () => useStore(counterStore);
```

## useStoreSelector

`useStoreSelector` - **`React Hook`** - Takes in a store instance and takes a key of the state object of the given store and returns the stateful value of the given key's value.

```jsx
import { useStore } from '@poly-state/react';

const counterStore = createStore({ count: 0 });
const useCounterSelector = () => useSelector(counterStore);
```
