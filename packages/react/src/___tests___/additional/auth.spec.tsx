import '@testing-library/jest-dom';
import * as tester from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { AuthComponent } from '../components/authComponent';
test('Auth Store Tests', () => {
	const { container } = tester.render(<AuthComponent />);

	const login = container.querySelector('#login') as HTMLDivElement;
	const userInfo = container.querySelector('#userInfo') as HTMLDivElement;

	expect(login).toBeInTheDocument();
	expect(userInfo).not.toBeInTheDocument();

	const loginButton = login.querySelector('button') as HTMLButtonElement;
	expect(loginButton).toBeInTheDocument();

	act(() => loginButton.click());

	const updatedLogin = container.querySelector('#login') as HTMLDivElement;
	const updatedUserInfo = container.querySelector('#userInfo') as HTMLDivElement;
	expect(updatedLogin).not.toBeInTheDocument();
	expect(updatedUserInfo).toBeInTheDocument();

	const userName = updatedUserInfo.querySelector('h1') as HTMLHeadingElement;
	expect(userName.textContent).toBe('John');

	const userEmail = updatedUserInfo.querySelector('h2') as HTMLHeadingElement;
	expect(userEmail.textContent).toBe('some@email.com');

	const userId = updatedUserInfo.querySelector('h3') as HTMLHeadingElement;
	expect(userId.textContent).toBe('123');

	const updateUserNameButton = updatedUserInfo.querySelector('button') as HTMLButtonElement;
	act(() => updateUserNameButton.click());

	expect(userName.textContent).toBe('JSON');

	const accessToken = container.querySelector('#accessToken') as HTMLDivElement;
	expect(accessToken).toBeInTheDocument();

	expect(accessToken.querySelector('h1') as HTMLHeadingElement).toHaveTextContent('token: 123');
	expect(accessToken.querySelector('p') as HTMLParagraphElement).toHaveTextContent(
		'rerender count 1'
	);
});
