import cities from './city.json';
import Select from 'react-select';
import styles from './style.module.css';

export type TValue = {
	name: string,
	county: string
}

export type TCitySelect = {
	city: TValue,
	setCity: (city: TValue) => void
}

export type TOption = {
	label: string,
	value: TValue
}

export default function CitySelect({ city, setCity }: TCitySelect){
	const handelChange = (data: TOption) => setCity(data.value);

	const formatGroupLabel = (data: { label: string, options: TOption[] }) => (
		<div className={styles.groupStyles}>
			<span>{data.label}</span>
			<span className={styles.groupBadgeStyles}>{data.options.length}</span>
		</div>
	);


	return (
		<Select
			options={cities}
			onChange={handelChange}
			defaultValue={{ label: city.name, value: city }}
			formatGroupLabel={formatGroupLabel}
			isSearchable={true}
		/>
	);
}
