import { useState } from 'react';
import Select from '../component/Select';
import PredictDisplay from '../component/PredictDisplay';
import cities from '../data/city.json';

import type { TLocation } from '../component/Select/index.d';

export default function Home() {
	const [ city, setCity ] = useState<TLocation>({ label: "板橋區", value: "F-D0047-069" });

	return (
		<>
			<Select
				state={city}
				setState={setCity}
				options={cities}
				instanceId='SelectCities'
			/>
			<h1>{ city.label }</h1>
			<PredictDisplay city={city} />
		</>
	)
}
