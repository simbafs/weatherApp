import {useState} from 'react';
import Select from '../component/Select';
import WeatherDisplay from '../component/WeatherDisplay';

import obversations from '../data/obversation.json';

export default function Index(){
	const [ obversation, setObversation ] = useState({ label: '板橋區 - 板橋', value: '板橋' });
	const selectOptions = obversations.map(i => ({
		label: i.city,
		options: i.obversation.map(i => ({
			label: `${i.town} - ${i.name}`,
			value: `${i.name}`
		}))
	}))
	return (
		<>
			<Select state={obversation} setState={setObversation} options={selectOptions} instanceId='obersvationSelect'/>
			<h1>{obversation.label}</h1>
			<WeatherDisplay location={obversation}/>
		</>
	);
}
