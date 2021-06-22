interface IWeatherProps {
	location: string
}

export default function WeatherDisplay({ location } : IWeatherProps){
	return (
		<div>{ location }</div>
	);
}
