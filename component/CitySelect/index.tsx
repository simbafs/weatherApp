import cities from './city.json';
import Select from 'react-select';
import styles from './style.module.css';

type TCitySelect = {
	city: string,
	setCity: (city: string) => void
}

type TOption = {
	label: string,
	value: string
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
			defaultValue={{ label: city, value: city }}
			formatGroupLabel={formatGroupLabel}
			isSearchable={true}
		/>
	);
}
