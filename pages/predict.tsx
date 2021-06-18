import { useState } from 'react';
import CirySelect from '../component/CitySelect';
import WeatherDisplay from '../component/WeatherDisplay';

import type { TCity } from '../component/CitySelect/index.d';

import styles from '../styles/index.module.css';

export default function Home() {
	const [ city, setCity ] = useState<TCity>({ name: "板橋區", county: "F-D0047-069" });

	return (
		<>
			<div className={styles.card}>
				<CirySelect city={city} setCity={setCity}/>
				<h1>{ city.name }</h1>
				<WeatherDisplay city={city} />
			</div>
		</>
	)
}
