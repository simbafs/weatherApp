import useSWR from "swr";
import {parseStringPromise} from "xml2js";
import getLocation from '../lib/getLocation';
import type { TTown } from '../lib/getLocation';

export default function Town(){
	const { data, error } = useSWR<TTown>('town', getLocation);

	console.log(data);
	if(!data) return <h1>Loading ......</h1>;
	if(data.town === undefined || data.city === undefined) return <h1>Error: 查無地號</h1>;
	if(error) return <h1>Error: {JSON.stringify(error, null, 2)}</h1>;
	return <h1>{data.city}{data.town}</h1>;
}
