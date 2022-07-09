---
id: react-quick-start
title: Quick Start
slug: /react-quick-start
sidebar_label: Quick Start
---

# ReactJS Quick Start

Your can use this library on your ReactJS application. For binding state in your ReactJS application, you need to use `@poly-state/react` library. It's same for your Next.js application.

```shell
yarn add @poly-state/poly-state @poly-state/react
```

## Create a store

```jsx
import { createStore } from '@poly-state/poly-state';
import { createStoreHooks } from '@poly-state/react';

const counterStore = createStore({ count: 0 });
const [useCounterStore, useCounterSelector] = createStoreHooks(counterStore);
```

## Use store and update

```jsx
export const MyCounter = () => {
	const { count } = useCounterStore();

	return (
		<div>
			<h1>{count}</h1>
			<button onClick={() => counterStore.setCount((prev) => prev - 1)}>
				Decrement
			</button>
			<button onClick={() => counterStore.setCount((prev) => prev + 1)}>
				Increment
			</button>
		</div>
	);
};
```
