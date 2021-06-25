import useSWR from "swr";
import {parseStringPromise} from "xml2js";

type TTown = {
	city: string,
	town: string
}

export default function Town(){
	function getLocation(){
		return new Promise<TTown>(res => {
			// ingore ts error here
			if(process.browser && 'geolocation' in navigator){
				navigator.geolocation.getCurrentPosition((position) => {
					// console.log(position.coords.longitude, position.coords.latitude)
					let { longitude, latitude } = position.coords;

					fetch(`https://api.nlsc.gov.tw/other/TownVillagePointQuery/${longitude}/${latitude}`)
					.then(res => res.text())
					.then(res => parseStringPromise(res))
					.then(res => Object.values(res.townVillageItem).map(i => (i as string[])[0]))
					.then(res => ({
						city: res[1],
						town: res[3]
					}))
					.then(data => res(data))
				}, () => {
					res({ city: 'unknown', town: 'unknown' });
				});
			}else{
				res({ city: 'unknown', town: 'unknown' });
			}
		})
	}

	const { data, error } = useSWR<TTown>('town', getLocation);
	console.log(data);
	if(!data) return <h1>Loading ......</h1>;
	if(data.town === undefined || data.city === undefined) return <h1>Error: 查無地號</h1>;
	if(error) return <h1>Error: {JSON.stringify(error, null, 2)}</h1>;
	return <h1>{data.city}{data.town}</h1>;
}
