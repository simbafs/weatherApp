import {useEffect, useState, ChangeEvent, ChangeEventHandler} from 'react';
import cities from './city.json';

type TCitySelect = {
	city: string,
	setCity: (city: string) => void
}

type TOption = {
	city: string,
	selectd?: boolean
}

function Option({ city, selectd }: TOption){
	if(selectd) return <option value={city} selected>{city}</option>;
	else return <option value={city}>{city}</option>;
}

export default function CitySelect({ city, setCity }: TCitySelect){
	const handleChange: ChangeEventHandler = (e: ChangeEvent<HTMLInputElement>) => {
		setCity(e.target.value);
	}

	return (
		<select
			onChange={handleChange}
		>
			{cities.map((i, index) => <Option city={i} selectd={i === city} key={index}/>)}
		</select>
	);
}
