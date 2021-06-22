export default function qs(query: { [name:string]: any }): string{
	let result = '';
	for(let [key, value] of Object.entries(query)){
		result += `${key}=${value.toString()}&`;
	}

	// remove the last '&'
	result = result.slice(0, -1);

	return result;
}
