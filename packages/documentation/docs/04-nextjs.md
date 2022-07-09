---
id: nextjs-ssr
title: Next.js with SSR
slug: /nextjs-ssr
sidebar_label: Next.js with SSR
---

### Accessing your store instances on your server

It is safe to use store's functionality on your Server side code such as GetInitialProps on a page. However, once the app has rendered on the browser the store will be re created and the state will be lost.
To deal with this, poly-state comes with a special **`hydrate`** method which is designed to be able to set the store's data on the client side by taking the data from server side. Since it you only need to do this once before the app is rendered on the client side, it's the perfect choice for reducing boilerplate code on server side authentication and preventing flash of unauthenticated content.

To get started, create an \_app.tsx file in your pages folder and add the following content:

```tsx
import App, { AppContext, AppProps } from 'next/app';
import { parseCookies } from 'nookies';
import { authStore, AuthStoreType, useAuthStore } from '../auth.store';

type ExtendedAppProps = AppProps & { authStore: AuthStoreType };

function CustomApp({
	Component,
	pageProps,
	authStore: authStoreHydrateValue,
}: ExtendedAppProps) {
	/**
	 * receive the serialized state from server side to client side,
	 * since it fires synchroneously all of your pages and apps will
	 * have the latest state
	 */
	authStore.hydrate(authStoreHydrateValue);
	const { isLoggedIn } = useAuthStore(); // true if the user is logged in

	return (
		<div className='app'>
			{isLoggedIn && <div>You are logged in</div>}
			<Component {...pageProps} />
		</div>
	);
}

CustomApp.getInitialProps = async (appContext: AppContext) => {
	const cookies = parseCookies(appContext.ctx);

	if (cookies?.token && cookies?.token !== '') {
		authStore.setState((state) => {
			return { ...state, isLoggedIn: true, token: cookies.token };
		});
	}

	const appProps = await App.getInitialProps(appContext);
	return { ...appProps, authStore: authStore.getState() };
};

export default CustomApp;
```

That's all, now you can access/update authStore from any of the page's getInitialProps without any issues and your client side will always have the latest state before rendering.

:::warning
While we do not limit the use of unserializable data in the store, it is highly recommended to use only serializable data.
In next.js the props are serialized before they are sent to the App component, so anything that is not JSON.stringifyable will be lost.
:::
