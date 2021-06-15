import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/index.module.css'

import CirySelect from '../component/CitySelect';
import {useState} from 'react';

export default function Home() {
	const [ city, setCity ] = useState("新北市");
	return (
		<div className={styles.card}>
			<CirySelect city={city} setCity={setCity}/>
		</div>
	)
}
