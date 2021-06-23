interface IInfoProps {
	humidity: string,
	maxTemp: string,
	maxTempTime: string,
	minTemp: string,
	minTempTime: string,
	pressure: string
}

import style from './style.module.css';

export default function Info({ humidity, maxTemp, maxTempTime, minTemp, minTempTime, pressure }: IInfoProps){
	return (
		<div className={style.Info}>
			<h4>濕度</h4>
			<h4>{humidity}</h4>
			<h4>本日最高溫度</h4>
			<h4>{maxTemp}</h4>
			<h6>{maxTempTime}</h6>
			<h4>本日最低溫度</h4>
			<h4>{minTemp}</h4>
			<h6>{minTempTime}</h6>
			<h4>氣壓</h4>
			<h4>{pressure}</h4>
		</div>
	)
}
