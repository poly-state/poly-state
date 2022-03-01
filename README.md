# poly-state

A boilerplate free state management library for your React, Next.js, Preact and SolidJS applications. Check out the [**documentation**](https://poly-state.github.io) for quick start.

## Installation

For the core library:

```bash
npm install @poly-state/poly-state
```

For React and Next.js:

```bash
npm install @poly-state/poly-state @poly-state/react
```

For Preact:

```bash
npm install @poly-state/poly-state @poly-state/preact
```

You can also install the library with `yarn add @poly-state/poly-state`, `yarn add @poly-state/react` and `yarn add @poly-state/preact`. For more installation details, see the [**instructions**](https://poly-state.github.io/docs/installation).

## Features

- Boilerplate free API
- No reducers and actions
- No context provider
- Lightweight
- Fully typed and should work fine with javascript projects as well
- Ability to extend store functionality by extending the store class and adding your own methods.
- Equality Checks to prevent unnecessary re-renders
- SSR support

## Documentation

Documentation for poly-state is located at **https://poly-state.github.io**.

- [**Installation**](https://poly-state.github.io/docs/installation)
- [**React**](https://poly-state.github.io/docs/react-quick-start)
- [**SSR with Next.js**](https://poly-state.github.io/docs/nextjs-ssr)
- [**Preact**](https://poly-state.github.io/docs/preact)
- [**Advanced Uses**](https://poly-state.github.io/docs/advanced-uses)
- [**API Reference**](https://poly-state.github.io/docs/api-reference)
- [**Middleware**](https://poly-state.github.io/docs/advanced-uses#middleware)

## Examples

```typescript
import { createStore } from '@poly-state/poly-state';
import { useStore } from '@poly-state/react'; // React & Next.js only
// import { useStore } from '@poly-state/preact'; // Preact only

// Create your own store
const counterStore = createStore({ count: 0 });
const useCounterStore = () => useStore(counterStore);

// Your React / Next.js / Preact component
export const MyCounter = () => {
	const { count } = useCounterStore();

	return (
		<div>
			<h1>{count}</h1>
			<button onClick={() => counterStore.setCount((prev) => prev - 1)}>Decrement</button>
			<button onClick={() => counterStore.setCount((prev) => prev + 1)}>Increment</button>
		</div>
	);
};
```

## Supported platforms

- React/Next.js
  - npm: `npm install @poly-state/react`
  - yarn: `yarn add @poly-state/react`
- Preact
  - npm: `npm install @poly-state/preact`
  - yarn: `yarn add @poly-state/preact`
- SolidJS (experimental)

> It is also possible to use this library in other frontend frameworks/libraries, we plan on adding support for Svelte, Vue, Angular in the near future.

## Contributing

Issues and pull requests of all sorts are welcome!

I am actively looking for contributors/maintainers for this project, if you're interested please reach out to me on LinkedIn/Email

> More Documentation and Advanced usage examples can be found in the [**documentation**](https://poly-state.github.io).

## License

This project is licensed under the [MIT License](https://github.com/poly-state/poly-state/blob/master/LICENSE).
