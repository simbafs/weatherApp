import style from './style.module.css';

interface ITemperatureProps {
	temp: string
}

export default function Temperature({temp}: ITemperatureProps){
	return 	<h1 className={style.temp}>{`${Math.round(parseFloat(temp) * 10) / 10}°C`}</h1>;
}
