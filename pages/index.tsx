import {useEffect, useState} from 'react';
import Select from '../component/Select';
import WeatherDisplay from '../component/WeatherDisplay';

import obversations from '../data/obversation.json';

function getOptionsByTown(town: string){
	let target = obversations
	.map(i => [...i.obversation])
	.flat()
	.find(i => i.town === town)
	|| { name: '板橋', city: '新北市', town: '板橋區' };

	return {
		label: `${target.town} - ${target.name}`,
		value: `${target.name}`
	};
}

export default function Index(){
	const [ obversation, setObversation ] = useState(getOptionsByTown('板橋區'));

	// only exec when page load, getting town from localStorage
	useEffect(() => {
		setObversation(getOptionsByTown(localStorage.town));
	}, []);

	// exec every time when obversation change, saving it to localStorage
	useEffect(() => {
		localStorage.setItem('town', obversation.label.split(' - ')[0]);
	}, [ obversation ]);

	const selectOptions = obversations.map(i => ({
		label: i.city,
		options: i.obversation.map(i => ({
			label: `${i.town} - ${i.name}`,
			value: `${i.name}`
		}))
	}));

	// TODO: this code cause error
	// const { data, error } = useSWR('get geolocation', getLocation);
	// if(data && data.town) setObversation(getOptionsByTown(data.town));

	return (
		<>
			<Select state={obversation} setState={setObversation} options={selectOptions} instanceId='obersvationSelect'/>
			<h1>{obversation.label}</h1>
			<WeatherDisplay location={obversation}/>
		</>
	);
}
