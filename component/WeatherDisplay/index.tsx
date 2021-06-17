import useSWR from "swr";
import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';

import type { TCity } from '../CitySelect/index.d';
import type { TWeatherProps, TWeatherElement } from './index.d';

import styles from './styles.module.css';

const token = 'CWB-25BB0BA2-9449-4DD2-82D6-D835F21722EE';

function qs(query: { [name:string]: any }): string{
	let result = '';
	for(let [key, value] of Object.entries(query)){
		result += `${key}=${value.toString()}&`;
	}
	return result;
}

function formatWeather(weather: TWeatherElement[]){
	let WS = weather[8].time.map(i => ({
		time: i.dataTime,
		WS: i.elementValue[0].value
	}));
	return {
		raw: weather,
		data: WS
	};
}

function fetchWeather(city: TCity){
	const url = 'https://opendata.cwb.gov.tw/api/v1/rest/datastore';
	const query = qs({
		Authorization: token,
		locationName: city.name
	})
	console.log('fetch url', `${url}/${city.county}?${query}`);
	return fetch(`${url}/${city.county}?${query}`)
	.then(res => res.json())
	.then(res => res.records.locations[0].location[0].weatherElement)
	.then(res => formatWeather(res))
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
		<>
			<div className={styles.weatherDisplay}>
				<ResponsiveContainer width="90%" height={300} >
					<LineChart data={weather.data}>
						<CartesianGrid stroke="#ccc" strokeDasharray="3 3"/>
						<XAxis dataKey="time" />
						<YAxis label={{ value: 'wind speed', angle: -90, position: 'insideLeft' }}/>
						<Legend />
						<Tooltip />

						<Line type="natural" dataKey="WS" stroke="#8884d8" />
					</LineChart>
				</ResponsiveContainer>
			</div>
			<pre>{JSON.stringify(weather.raw, null, 2)}</pre>
		</>
	);
}
