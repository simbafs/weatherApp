import {useEffect, useState, ChangeEvent, ChangeEventHandler} from 'react';
import cities from './city.json';

type TCitySelect = {
	city: string,
	setCity: (city: string) => void
}

type TOption = {
	city: string
}

function Option({ city }: TOption){
	return <option value={city}>{city}</option>;
}

export default function CitySelect({ city, setCity }: TCitySelect){
	const handleChange: ChangeEventHandler = (e: ChangeEvent<HTMLInputElement>) => {
		setCity(e.target.value);
	}

	return (
		<select
			onChange={handleChange}
			defaultValue={city}
		>
			{cities.map((i, index) => <Option city={i} key={index}/>)}
		</select>
	);
}
