import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import React from 'react';
import HomepageFeatures from '../components/HomepageFeatures';

export default function Home(): JSX.Element {
	const { siteConfig } = useDocusaurusContext();

	return (
		<Layout title={siteConfig.title} description={siteConfig.tagline}>
			<main>
				<HomepageFeatures />
			</main>
		</Layout>
	);
}
