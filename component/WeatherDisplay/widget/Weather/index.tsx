interface IWeatherProps {
	weather: string
}

import style from './style.module.css';

export default function Weather({ weather }: IWeatherProps){
	return <h1 className={style.Weather}>{weather}</h1>;
}
