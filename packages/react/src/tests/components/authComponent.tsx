import { FC, useEffect, useState } from 'react';
import { authStore, useAuthStoreSelector } from '../stores/auth.store';

const UserInfoComponent: FC = () => {
	const userInfo = useAuthStoreSelector((state) => state.userInfo);

	return (
		<div id='userInfo'>
			<h1>{userInfo.name}</h1>
			<h2>{userInfo.email}</h2>
			<h3>{userInfo.id}</h3>

			<button onClick={() => authStore.setUserInfo((v) => ({ ...v, name: 'JSON' }))}>
				update user name
			</button>
		</div>
	);
};

const LoginComponent: FC = () => {
	return (
		<div id='login'>
			<button
				onClick={() => {
					authStore.setState({
						accessToken: '123',
						userInfo: {
							name: 'John',
							email: 'some@email.com',
							id: '123',
						},
						refreshToken: '123',
						isLoggedIn: true,
					});
				}}
			>
				login
			</button>
		</div>
	);
};

const AccessTokenComponent = () => {
	const [reRenderCount, setRerenderCount] = useState(0);

	const accessToken = useAuthStoreSelector((state) => state.accessToken);

	useEffect(() => setRerenderCount((c) => c + 1), []);

	return (
		<div id='accessToken'>
			<h1>token: {accessToken}</h1>
			<p>rerender count {reRenderCount}</p>
		</div>
	);
};

export const AuthComponent: FC = () => {
	const isLoggedIn = useAuthStoreSelector((s) => s.isLoggedIn);

	return (
		<div>
			{isLoggedIn ? <UserInfoComponent /> : <LoginComponent />}
			<AccessTokenComponent />
		</div>
	);
};
