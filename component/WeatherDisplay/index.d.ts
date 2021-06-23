export interface IWeatherProps {
	location: { label: string, value: string }
}

export interface IRawWeatherData {
	lat: string,
	lon: string,
	locationName: string,
	stationId: string,
	time: {
		obsTime: string
	},
	weatherElement: {
		elementName: string,
		elementValue: string
	}[],
	parameter: {
		parameterName: string,
		parameterValue: string
	}[]
}
