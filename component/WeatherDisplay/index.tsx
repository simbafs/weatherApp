import useSWR from 'swr';
import qs from '../../lib/qs';

interface IWeatherProps {
	location: { label: string, value: string }
}

const token = 'CWB-25BB0BA2-9449-4DD2-82D6-D835F21722EE';

function fetcher(location: string){
	const url = 'https://opendata.cwb.gov.tw/api/v1/rest/datastore/O-A0003-001';
	const query = qs({
		Authorization: token,
		locationName: encodeURI(location)
	});
	return fetch(`${url}?${query}`)
	.then(res => res.json())
	.then(res => res.records.location[0])
}

export default function WeatherDisplay({ location } : IWeatherProps){
	const {data, error} = useSWR(`fetch ${location.value}`, () => fetcher(location.value));
	if(!data) return <h1>Loading ...</h1>;
	if(error) return <h1>Error: {JSON.stringify(error, null,2)}</h1>;
	
	return <pre>{JSON.stringify(data, null, 2)}</pre>;
}
