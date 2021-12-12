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

## How to use

first define a type for the values you would like to store in your state `[Recommended]`

```typescript
type MyStoreType = {
	name: string;
	count: number;
};
```

then create an initial state for your store

```typescript
type MyStoreType = {
	name: string;
	count: number;
};

const myStoreInitialState: MyStoreType = {
	name: '',
	count: 0,
};
```

finally, create your store

```typescript
import { createStore } from 'poly-state';
import { useStore } from 'poly-state/hooks/react';

type MyStoreType = {
	name: string;
	count: number;
};

const myStoreInitialState: MyStoreType = {
	name: '',
	count: 0,
};

export const myStore = createStore(myStoreInitialState);

//[optional] create hooks to use your store easily

export const useMyStore = () => useStore(myStore);
```

now let's make a counter example with React with the store we just created:

```tsx
export const MyComponent = () => {
	const { count } = useMyStore();

	const handleIncrement = () => {
		myStore.setCount((previousCount) => previousCount + 1);
	};

	return (
		<div>
			<h1>Count is {count}</h1>
			<button onClick={handleIncrement}>Count is {count}</button>
		</div>
	);
};
```

## How does it work?

The `createStore` function takes your initial state and returns an instance of Internal `Store` class and creating setter methods for each of your properties.

By using the setter methods you can change your state's values.

Using the `useStore` hook subscribes to the updates of your state and every time the internal state is changed, the value returned by the `useStore` hook is also updated, which in turn updates the UI.

There is no need to wrap your components with a provider like other state management libraries since the useStore hooks relies on Effect caused by the state updates and cleans up itself on unmount.

> This library is at beta stage and API's are subject to change, use at your own risk

## Supported platforms

- React/Next.js `import hooks from poly-state/hooks/react`
- Preact `import hooks from poly-state/hooks/preact`
- SolidJS `import hooks from poly-state/hooks/solidjs`

> It is also possible to use this library in other frontend frameworks/libraries I plan on adding support for Svelte, Vue, Angular in near future

## Types

The libraries are fully typed and depends only on the type that you provide in initialization step, no further configuration is required.

## Contributing

Pull Requests are welcome.

I am actively looking for contributors/maintainers for this project, if you're interested please reach out to me on LinkedIn/Email

> More Documentation and Advanced usage coming soon
