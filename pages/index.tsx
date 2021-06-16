import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/index.module.css'

import {useEffect, useState} from 'react';
import CirySelect, { TValue } from '../component/CitySelect';
import WeatherDisplay, { TWeatherElement } from '../component/WeatherDisplay';

const token = 'CWB-25BB0BA2-9449-4DD2-82D6-D835F21722EE';

function qs(query: { [name:string]: any }): string{
	let result = '';
	for(let [key, value] of Object.entries(query)){
		result += `${key}=${value.toString()}&`;
	}
	return result;
}

export default function Home() {
	const [ city, setCity ] = useState<TValue>({ name: " 板橋區", county: "F-D0047-069" });
	const [ weather, setWeather ] = useState<TWeatherElement | {}>({});
	useEffect(() => {
		const url = 'https://opendata.cwb.gov.tw/api/v1/rest/datastore';
		const query = qs({
			Authorization: token,
			locationName: city.name
		})
		fetch(`${url}/${city.county}?${query}`)
		.then(res => res.json())
		.then(res => res.records.locations[0].location[0].weatherElement)
		.then(res => setWeather(res))
		.catch(console.error);
	}, [ city ]);
	return (
		<>
			<div className={styles.card}>
				<CirySelect city={city} setCity={setCity}/>
				<h1>{ city.name }</h1>
				<WeatherDisplay weather={weather}/>
			</div>
		</>
	)
}
