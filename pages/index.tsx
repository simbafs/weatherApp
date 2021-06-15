import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/index.module.css'
import axios from 'axios';

import CirySelect from '../component/CitySelect';
import {useEffect, useState} from 'react';

const token = 'CWB-25BB0BA2-9449-4DD2-82D6-D835F21722EE';

function qs(query: { [name:string]: any }): string{
	let result = '';
	for(let [key, value] of Object.entries(query)){
		result += `${key}=${value.toString()}&`;
	}
	return result;
}

export default function Home() {
	const [ city, setCity ] = useState("新北市");
	const [ weather, setWeather ] = useState({
		startTime: '',
		endTime: '',
		description: '',
		maxTemp: 0,
		minTemp: 0,
		rain: 0
	});
	useEffect(() => {
		const url = 'https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-C0032-001';
		// const url = 'https://opendata.cwb.gov.tw/api/v1/rest/datastore/O-A0003-001';
		const query = qs({
			Authorization: token,
			locationName: city
		})
		fetch(`${url}?${query}`)
			.then(res => res.json())
			.then(res => console.log(res.records.location[0]))
			.catch(console.error);
	}, [ city ]);
	return (
		<>
			<CirySelect city={city} setCity={setCity}/>
			<div className={styles.card}>
				<h1>{ city }</h1>

			</div>
		</>
	)
}
