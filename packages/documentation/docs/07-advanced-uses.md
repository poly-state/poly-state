---
id: advanced-uses
title: Advanced Uses
slug: /advanced-uses
sidebar_label: Advanced Uses
---

# Advanced Uses

Here is an example store of todo items and it is written in OOP style. We strongly recommend to use TypeScript to write the code.

:::info Things to know

In the following example, we create a variable `initialState` and assign it to an instance of the `TodoStore` class. At the time of creating TodoStore class, we also extend the `Store` class. The Store class come with a few methods which we can use to interact with the store, please check the [**API reference**](/docs/api-reference) for more details. Following methods are also available in the Store class:

:::

- `setCount(count)`: This method is used to set the count of the todo items.
- `setTodos(todos)`: This method is used to set the todo items.

## Example

```tsx
import { getStoreClass } from '@poly-state/poly-state';
import { useStore } from '@poly-state/react';

type Todo = {
	id: string;
	text: string;
	completed: 'incomplete' | 'complete';
};

type TodoStoreState = {
	count: number;
	todos: Todo[];
};

const initialState: TodoStoreState = {
	count: 0,
	todos: [],
};

class TodoStore extends getStoreClass<TodoStoreState>() {
	addTodo(todo: Todo) {
		this.setState((state) => ({
			...state,
			todos: [...state.todos, todo],
			count: state.count + 1,
		}));
	}

	removeTodo(id: string) {
		this.setState((state) => ({
			...state,
			todos: state.todos.filter((todo) => todo.id !== id),
			count: state.count - 1,
		}));
	}

	toggleTodo(id: string) {
		this.setState((state) => ({
			...state,
			todos: state.todos.map((todo) => {
				if (todo.id === id) {
					return {
						...todo,
						completed:
							todo.completed === 'incomplete' ? 'complete' : 'incomplete',
					};
				}

				return todo;
			}),
		}));
	}
}

export const todoStore = new TodoStore(initialState);
export const useTodoStore = () => useStore(todoStore);
```

## Asynchronous Logic

```tsx
class TodoStore extends getStoreClass<TodoStoreState>() {
	async addAsyncTodo(text: string) {
		const response = await fetch('/api/todos', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ text }),
		});
		const todo = (await response.json()) as Todo;

		if (response.ok) {
			this.setState((state) => ({
				...state,
				todos: [...state.todos, todo],
				count: state.count + 1,
			}));
		}
	}

	///////////////////////////////////////
}
```

## UI and React

```tsx
import { FC, ChangeEvent, KeyboardEvent, useState } from 'react';
import { todoStore } from './todo.store';

export const AddTodo: FC = () => {
	const [text, setText] = useState<string>('');

	const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
		setText(e.target.value);

	const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
		const trimmedText = e.target.value.trim();
		// If the user pressed the Enter key:
		if (e.key === 'Enter' && trimmedText) {
			// Add the todo to the store with a async call:
			todoStore.addAsyncTodo(trimmedText);
			// And clear out the text input
			setText('');
		}
	};

	return (
		<input
			type='text'
			placeholder='What needs to be done?'
			autoFocus={true}
			value={text}
			onChange={handleChange}
			onKeyDown={handleKeyDown}
		/>
	);
};
```

## Custom Equality Checks

```ts
const store = createStore(
	{
		count: 0,
		todos: [],
	},
	{
		equalityComparator: (prev, next) => {
			/**
			 * This is a custom equality check ->
			 * If true is returned, all components using this store will re render
			 * if false is returned, no components will re render
			 */
		},
	}
);
```

:::info

If no funcations are provided to the `equalityComparator` option, the default equality check will be used. Which performs a deep equality check.

:::

## Middleware

Middleware lets you enjoy the custom functionality for fun and benefit. If you have a middleware that does some custom logic, you can use it to enhance the functionality of your store. For example, you can implement a logger middleware that can be used to debug your store.

```ts
const todoStore = new TodoStore(initialState);
todoStore
	.use(loggerMiddleware) // Add the logger middleware
	.use(anotherMiddleware); // You can use multiple middlewares
```
