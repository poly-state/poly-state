import { Link } from '@docusaurus/router';
import React from 'react';
import styles from './HomepageFeatures.module.css';

export default function HomepageFeatures(): JSX.Element {
	return (
		<section>
			<div className='container'>
				<div className='row'>
					<div className='col'>
						<div className={styles.featuresBox}>
							<img src='img/logo.jpeg' alt='poly-state' />
							<h1>poly-state</h1>
							<p>
								A boilerplate free state management library for your React,
								Next.js, Preact and SolidJS applications
							</p>
							<div className={styles.buttons}>
								<Link
									className='button button--primary button--lg'
									to='/docs/installation'
								>
									Get Started
								</Link>
								<a
									className='button button--secondary button--lg'
									href='https://codesandbox.io/s/poly-state-example-6od6vo'
									target='_blank'
								>
									Playground
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
