import type { TCity } from '../CitySelect'

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

export type TWeatherProps = {
	city: TCity
}

