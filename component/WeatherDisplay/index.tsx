import useSWR from 'swr';
import qs from '../../lib/qs';

import { IRawWeatherData, IWeatherProps } from './index.d';

import style from './style.module.css';
import { Temperature, Wind, Info, Weather } from './widget';

const token = process.env.CWBToken;

function findWeatherElement(weather: IRawWeatherData, name: string){
	let value = weather.weatherElement.find(i => i.elementName == name);
	return value ? value.elementValue : '-99';
}

async function fetcher(location: string){
	const url = 'https://opendata.cwb.gov.tw/api/v1/rest/datastore/O-A0003-001';
	const query = qs({
		Authorization: token,
		locationName: encodeURI(location)
	});
	return fetch(`${url}?${query}`)
	.then(res => res.json())
	.then(res => res.records.location[0])
	.then((res: IRawWeatherData) => ({
		raw: res,
		formatted: {
			風速: findWeatherElement(res, 'WDSD'),
			風向: findWeatherElement(res, 'WDIR'),
			溫度: findWeatherElement(res, 'TEMP'),
			相對濕度: findWeatherElement(res, 'HUMD'),
			測站氣壓: findWeatherElement(res, 'PRES'),
			日累積雨量: findWeatherElement(res, '24R'),
			本日最高溫: findWeatherElement(res, 'D_TX'),
			本日最高溫發生時間: findWeatherElement(res, 'D_TXT'),
			本日最低溫: findWeatherElement(res, 'D_TN'),
			本日最低溫發生時間: findWeatherElement(res, 'D_TNT'),
			天氣狀況: findWeatherElement(res, 'Weather')
		}
	}))
}

export default function WeatherDisplay({ location } : IWeatherProps){
	const {data, error} = useSWR(`fetch ${location.value}`, () => fetcher(location.value));
	if(!data) return <h1>Loading ...</h1>;
	if(error) return <h1>Error: {JSON.stringify(error, null,2)}</h1>;

	return (
		<>
			<div className={style.windAndTemp}>
				<Temperature temp={data.formatted.溫度} />
				<Wind speed={data.formatted.風速} direction={data.formatted.風向} />
			</div>
			<Info 
				humidity={data.formatted.相對濕度}
				maxTemp={data.formatted.本日最高溫}
				maxTempTime={data.formatted.本日最高溫發生時間}
				minTemp={data.formatted.本日最低溫}
				minTempTime={data.formatted.本日最低溫發生時間}
				pressure={data.formatted.測站氣壓}
			/>
			<Weather weather={data.formatted.天氣狀況}/>
			<h4>更新時間：{data.raw.time.obsTime}</h4>
			{
			// <pre>{JSON.stringify(data.formatted, null, 2)}</pre>
			}
		</>
	);
}
