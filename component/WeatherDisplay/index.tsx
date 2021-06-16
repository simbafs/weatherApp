export type TWeatherRecord = {
	startTime: string,
	endTime: string,
	ementValue: {
		measure: any,
		value: any
	}[]
}

export type TWeatherElement = {
	description: string,
	elementName: string,
	time: TWeatherRecord[]
}

type TWeatherProps = {
	weather: TWeatherElement | {}
}

export default function WeatherDisplay({ weather }: TWeatherProps){
	return (
		<pre>{JSON.stringify(weather, null, 2)}</pre>
	);
}
