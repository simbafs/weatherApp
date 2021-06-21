import type { TCity } from '../CitySelect'

export type TWeatherRecord = {
	startTime: string,
	endTime: string,
	dataTime?: string,
	elementValue: {
		measure: any,
		value: any
	}[]
}

export type TWeatherElement = {
	description: string,
	elementName: string,
	time: TWeatherRecord[]
}

export type TWeatherProps = {
	city: TCity
}

type TFormattedWeatherElement = {
	time: string,
	[value: string]: string
}

export type TWeatherElementProps = {
	weatherEle: TFormattedWeatherElement[]
	value: string
}
