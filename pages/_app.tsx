import '../styles/globals.css';
import Head from 'next/head';
import Link from 'next/link';
import type { AppProps } from 'next/app';

export default function MyApp({ Component, pageProps }: AppProps) {
	return (
		<>
			<Head>
				<title>Weather App</title>
				<link rel="shortcut icon" href="/favicon.ico" />
				<link rel="manifest" href="/manifest.json" />
				<link rel="apple-touch-icon" sizes="192x192" href="/icon-192.png" />
				<link rel="shortcut icon" sizes="512x512" href="favicon.ico" />

				<meta name="theme-color" content="#FFD347" />
				<meta name="description" content="Weather App" />
				<meta name="author" content="simba-fs" />
				<meta name="keywords" content="weather Taiwan CWB" />
			</Head>
			<div id="container">
				<div className="card">
					<Component {...pageProps} />
				</div>
			</div>
			<footer>
				<span>CopyRight  ©  <a href="https://github.com/simba-fs">simba-fs</a></span>
				<a href="https://github.com/simba-fs/weatherApp">Source Code</a>
			</footer>
		</>
	);
}
