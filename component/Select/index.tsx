import ReactSelect from 'react-select';
import styles from './style.module.css';

import type { TSelectProps, TOption, TLocation } from './index.d';
import type { ValueType } from 'react-select';

export default function Select({ options, state, setState, instanceId }: TSelectProps){
	const handelChange = (data: ValueType<TLocation, false>) => data ? setState(data) : null;

	const formatGroupLabel = (data: TOption) => (
		<div className={styles.groupStyles}>
			<span>{data.label}</span>
			<span className={styles.groupBadgeStyles}>{data.options.length}</span>
		</div>
	);

	return (
		<ReactSelect
			instanceId={instanceId}
			options={options}
			onChange={handelChange}
			defaultValue={state}
			formatGroupLabel={formatGroupLabel}
			isSearchable={true}
		/>
	);
}
