# React bindings for Poly state

## How to install

```bash

npm install @poly-state/react
#or
yarn add @poly-state/react

```

## Example

```ts
import { createStore } from '@poly-state/core';
import { createStoreSelector } from '@poly-state/react';

export type CounterStoreType = {
	count: number;
};

export const counterStoreInitialState: CounterStoreType = {
	count: 0,
};

export const counterStore = createStore(counterStoreInitialState);
export const useCounterStoreSelector = createStoreSelector(counterStore);
```

> On Component level

```tsx
const TestComponent = () => {
	const count = useCounterStoreSelector((state) => state.count);

	const increment = () => {
		counterStore.setCount((prev) => prev + 1);
	};

	return <h1 onClick={increment}>{count}</h1>;
};
```
