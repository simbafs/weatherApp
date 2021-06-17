import '../styles/globals.css'
import Head from 'next/head'
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<>
			<Head>
				<title>Weather App</title>
				<link rel="shortcut icon" href="/favicon.ico" />
			</Head>
			<div id="container">
				<Component {...pageProps} />
			</div>
		</>
	);
}
export default MyApp
