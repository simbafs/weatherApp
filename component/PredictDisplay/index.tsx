import useSWR from "swr";
import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import qs from '../../lib/qs';

import type { TLocation } from '../Select/index.d';
import type {
	TWeatherProps,
	TWeatherElement,
	TWeatherElementProps,
	TFormattedWeatherElement
} from './index.d';

import styles from './styles.module.css';

const token = 'CWB-25BB0BA2-9449-4DD2-82D6-D835F21722EE';

function formatWeather(weather: TWeatherElement[]){
	function findWeatherElement(weather: TWeatherElement[], name: string){
		return weather.find(i => i.elementName === name) || weather[0];
	}

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

async function fetchWeather(city: TLocation){
	const url = 'https://opendata.cwb.gov.tw/api/v1/rest/datastore';
	const query = qs({
		Authorization: token,
		locationName: encodeURI(city.label)
	});
	// console.log('fetch url', `${url}/${city.value}?${query}`);
	return fetch(`${url}/${city.value.split('--')[1]}?${query}`)
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

export default function PredictDisplay({ city }: TWeatherProps){
	const { data: weather, error } = useSWR(
		() => `fetch ${city.label}`,
		() => fetchWeather(city)
	);

	if(error) return <pre>{error}</pre>;
	if(!weather) return <h3>Loading ...</h3>;
	if(error) return <h3>Error: {error}</h3>;
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
