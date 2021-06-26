import {parseStringPromise} from "xml2js";

export type TTown = {
	city: string,
	town: string
}

export default function getLocation(){
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
				.then(res);
			}, () => {
				res({ city: 'unknown', town: 'unknown' });
			});
		}else{
			res({ city: 'unknown', town: 'unknown' });
		}
	})
}
