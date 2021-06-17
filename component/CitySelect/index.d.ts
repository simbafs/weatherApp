export type TCity = {
	name: string,
	county: string
}

export type TCitySelect = {
	city: TCity,
	setCity: (city: TCity) => void
}

export type TOption = {
	label: string,
	value: TCity
}

