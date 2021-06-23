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

export interface IFormattedWeather {
	風速: string,
	風向: string,
	溫度: string,
	相對濕度: string,
	測站氣壓: string, 
	日累積雨量: string,
	本日最高溫: string,
	本日最高溫發生時間: string,
	本日最低溫: string,
	本日最低溫發生時間: string,
	天氣狀況: string
}
