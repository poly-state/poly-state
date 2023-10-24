---
'@poly-state/core': minor
'@poly-state/react': patch
---

## @poly-state/core:

- Global transactions support

```js
import { transact } from '@poly-state/core';

transact(() => {
  store1.setState({ count: 1 });
  store2.setState({ name: test });
  store2.setState({ address: 'London' });
});
```

> store 1 and store 2 will be updated only once!

## @poly-state/react:

- fixed a peer dependency issue for react
- use `useSyncExternalStore`
- use `shallowCompare`
- upgrade packages and bundling
