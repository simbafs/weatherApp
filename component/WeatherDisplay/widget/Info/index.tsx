interface IInfoProps {
	humidity: string,
	maxTemp: string,
	maxTempTime: string,
	minTemp: string,
	minTempTime: string,
	pressure: string
}

import style from './style.module.css';

const addColon = (time: string) => time.slice(0, 2) + ':' + time.slice(2, 4);

const temperature = (temp: string) => temp + '°C';

const humi = (humidity: string) => parseFloat(humidity) * 100 + '%';

const pres = (pressure: string) => pressure + 'hPa';

export default function Info({ humidity, maxTemp, maxTempTime, minTemp, minTempTime, pressure }: IInfoProps){
	return (
		<div className={style.Info}>
			<h3>濕度</h3>
			<h3>{humi(humidity)}</h3>
			<h3>本日最高溫度</h3>
			<h3>{temperature(maxTemp)}</h3>
			<h5>{addColon(maxTempTime)}</h5>
			<h3>本日最低溫度</h3>
			<h3>{temperature(minTemp)}</h3>
			<h5>{addColon(minTempTime)}</h5>
			<h3>氣壓</h3>
			<h3>{pres(pressure)}</h3>
		</div>
	)
}
