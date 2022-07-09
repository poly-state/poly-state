---
id: api-reference
title: API Reference
slug: /api-reference
sidebar_label: API Reference
---

> updaterFunction takes the current state and returns the new state. and same as React's functional updates for state.

- `hydrate(state|updaterFunction)`: This method is used to hydrate the store with the state. Please note that the hydrate function only affects the store only once in it's lifecycle and calling it multiple times does not do anything. Hydrate also does not trigger a component rerender even if the value was changed.

- `setState(state|updaterFunction)`: This method is used to set the state of the store.

- `subscribe(listener): UnSubscribeFunction`: This method will subscribe to the store and call the listener function when the state of the store is changed. and return an unsubscribe function once called will no longer call the listener function even if the store is changed.

- `getState()`: This method is used to get latest state of the store.

- `subscribeKey(key, listener): UnSubscribeFunction`: This method will subscribe to a specific key of the store and call the listener function when the state of that key is changed, and return an unsubscribe function once called will no longer call the listener function even if the store is changed.

- `use(middleware)`: this is used to intercept state updates and potentially modify them before they are applied to the store. See middleware docs to learn more about them. Check out the [**middleware**](/docs/advanced-uses#middleware) section for reference.
