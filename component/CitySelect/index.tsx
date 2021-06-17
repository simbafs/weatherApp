import cities from './city.json';
import Select from 'react-select';
import styles from './style.module.css';

import type { TCitySelect, TOption } from './index.d';
import type { ValueType } from 'react-select';

export default function CitySelect({ city, setCity }: TCitySelect){
	const handelChange = (data: ValueType<TOption, false>) => data ? setCity(data.value) : null;

	const formatGroupLabel = (data: { label: string, options: TOption[] }) => (
		<div className={styles.groupStyles}>
			<span>{data.label}</span>
			<span className={styles.groupBadgeStyles}>{data.options.length}</span>
		</div>
	);

	return (
		<Select
			instanceId="citySelect"
			options={cities}
			onChange={handelChange}
			defaultValue={{ label: city.name, value: city }}
			formatGroupLabel={formatGroupLabel}
			isSearchable={true}
		/>
	);
}
