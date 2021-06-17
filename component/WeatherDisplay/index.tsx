import useSWR from "swr";
import type { TCity } from '../CitySelect/index.d';
import type { TWeatherProps } from './index.d';

const token = 'CWB-25BB0BA2-9449-4DD2-82D6-D835F21722EE';

function qs(query: { [name:string]: any }): string{
	let result = '';
	for(let [key, value] of Object.entries(query)){
		result += `${key}=${value.toString()}&`;
	}
	return result;
}

async function fetchWeather(city: TCity){
	const url = 'https://opendata.cwb.gov.tw/api/v1/rest/datastore';
	const query = qs({
		Authorization: token,
		locationName: city.name
	})
	console.log('fetch url', `${url}/${city.county}?${query}`);
	return fetch(`${url}/${city.county}?${query}`)
	.then(res => res.json())
	.then(res => ({ city: res.records.locations[0].location[0].locationName, weatherElement: res.records.locations[0].location[0].weatherElement }))
	// .then(res => { console.log(res); return res })
	.catch(console.error);
}

export default function WeatherDisplay({ city }: TWeatherProps){
	const { data: weather, error } = useSWR(
		() => `fetch ${city.name}`, 
		() => fetchWeather(city),
		{ refreshInterval: 600*1000 }
	);

	if(error) return <pre>{error}</pre>
	if(!weather) return <h3>Loading ...</h3>;
	else return (
		<pre>{JSON.stringify(weather, null, 2)}</pre>
	);
}
