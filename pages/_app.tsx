import '../styles/globals.css'
import Head from 'next/head'
import type { AppProps } from 'next/app'

import styles from '../styles/index.module.css';

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<>
			<Head>
				<title>Weather App</title>
				<link rel="shortcut icon" href="/favicon.ico" />
			</Head>
			<div id="container">
				<div className={styles.card}>
					<Component {...pageProps} />
				</div>
			</div>
		</>
	);
}
export default MyApp
