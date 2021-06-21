export type TLocation = {
	label: string,
	value: string
}

export type TOption = {
	label: string,
	options: {
		label: string,
		value: string
	}[]
}

export type TSelectProps = {
	options: TOption[]
	state: TLocation,
	setState: (state: TLocation) => void,
	instanceId: string | number
}

