import useSWR from "swr";
import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';

import type { TCity } from '../CitySelect/index.d';
import type { 
	TWeatherProps, 
	TWeatherElement, 
	TWeatherElementProps,
	TFormattedWeatherElement
} from './index.d';

import styles from './styles.module.css';

const token = 'CWB-25BB0BA2-9449-4DD2-82D6-D835F21722EE';

function qs(query: { [name:string]: any }): string{
	let result = '';
	for(let [key, value] of Object.entries(query)){
		result += `${key}=${value.toString()}&`;
	}
	return result;
}

function findWeatherElement(weather: TWeatherElement[], name: string){
	return weather.find(i => i.elementName === name) || weather[0];
}

function formatWeather(weather: TWeatherElement[]){
	let WS = findWeatherElement(weather, 'WS').time.map(i => ({
		time: i.dataTime,
		'風速(m/s)': i.elementValue[0].value
	})) as TFormattedWeatherElement[];
	let PoP12h = findWeatherElement(weather, 'PoP12h').time.map(i => ({
		time: i.startTime,
		'降雨機率(%)': i.elementValue[0].value
	})) as TFormattedWeatherElement[];
	let AT = findWeatherElement(weather, 'AT').time.map(i => ({
		time: i.dataTime,
		'體感溫度(°C)': i.elementValue[0].value
	})) as TFormattedWeatherElement[];

	return {
		raw: weather,
		WS,
		PoP12h,
		AT
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

function WeatherElement({ weatherEle, value }: TWeatherElementProps){
	return (
		<ResponsiveContainer width="90%" height={300} >
			<LineChart data={weatherEle}>
				<CartesianGrid stroke="#ccc" strokeDasharray="3 3" y={10} />
				<XAxis dataKey="time" />
				<YAxis padding={{ top: 30 }} />
				<Legend />
				<Tooltip />

				<Line type="natural" dataKey={value} stroke="#8884d8" />
			</LineChart>
		</ResponsiveContainer>
	)
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
				<WeatherElement weatherEle={weather.WS} value='風速(m/s)'/>
				<WeatherElement weatherEle={weather.PoP12h} value='降雨機率(%)' />
				<WeatherElement weatherEle={weather.AT} value='體感溫度(°C)' />
			</div>
			{/*
			<pre>{JSON.stringify(weather.raw, null, 2)}</pre>
			*/}
		</>
	);
}
