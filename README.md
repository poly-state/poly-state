## Poly State

Simple and boilerplate free state management library

## How to install

---

### yarn

```properties
yarn add @poly-state/poly-state
```

### npm

```properties
npm install @poly-state/poly-state
```

---

## How to use `React`

first Install react bindings for poly-state

### npm

```properties
npm install @poly-state/react
```

### yarn

```properties
yarn add @poly-state/react
```

---

create a store:

```typescript
import { createStore } from '@poly-state/poly-state';
import { createHooks } from '@poly-state/react';

const counterStore = createStore({ count: 0 });

const [useCounterStore, useCounterStoreSelector] = createHooks(counterStore);
```

---

use store in your component

```tsx
export const MyCounter = () => {
	const count = useCounterStoreSelector('count');

	// or const { count } = useCounterStore();

	const increment = () => {
		counterStore.setCount((count) => count + 1);

		// or counterStore.setCount(count + 1);
		// or counterStore.setState({ count: count + 1 });
		// or counterStore.setState((state) => {
		//	return {...state, count: state.count + 1};
		//}));
	};

	return (
		<div>
			<h1>{count}</h1>
			<button onClick={increment}>Increment</button>
		</div>
	);
};
```

That's all there is to it!
You do not have to defined anything fancy or reducers and actions, just use the store.

There is also no need to use a context provider to use the store.

---

## Features:

- Boilerplate free API
- No reducers and actions
- No context provider
- Lightweight
- Fully typed and should work fine with javascript projects as well

- Ability to extend store functionality by extending the store class and adding your own methods.
- Equality Checks to prevent unnecessary re-renders

- SSR support

---

## How does it work?

The `createStore` function takes your initial state and returns an instance of Internal `Store` class and creating setter methods for each of your properties.

By using the setter methods you can change your state's values.

Using the `useStore` hook subscribes to the updates of your state and every time the internal state is changed, the value returned by the `useStore` hook is also updated, which in turn updates the UI.

There is no need to wrap your components with a provider like other state management libraries since the useStore hooks relies on Effect caused by the state updates and cleans up itself on unmount.

> This library is at beta stage and API's are subject to change, use at your own risk

## Supported platforms

- React/Next.js
  - npm: `npm install @poly-state/react`
  - yarn: `yarn add @poly-state/react`
- Preact `upcoming`
  - npm: `npm install @poly-state/preact`
  - yarn: `yarn add @poly-state/preact`
- SolidJS `upcoming`
  - npm: `npm install @poly-state/solidjs`
  - yarn: `yarn add @poly-state/solidjs`

> It is also possible to use this library in other frontend frameworks/libraries I plan on adding support for Svelte, Vue, Angular in near future

## Contributing

Pull Requests are welcome.

I am actively looking for contributors/maintainers for this project, if you're interested please reach out to me on LinkedIn/Email

> More Documentation and Advanced usage coming soon
