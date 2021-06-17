import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Label } from 'recharts';
const data = [
	{name: 'Page A', uv: 400, pv: 2400, amt: 2400},
	{name: 'Page B', uv: 300, pv: 2300, amt: 2400},
	{name: 'Page C', uv: 300, pv: 2200, amt: 2400},
	{name: 'Page D', uv: 150, pv: 2100, amt: 2400},
	{name: 'Page E', uv: 100, pv: 2000, amt: 2400},
];

export default function Test(){
	return (
		<LineChart width={600} height={300} data={data}>
			<CartesianGrid stroke="#ccc" strokeDasharray="3 3"/>
			<XAxis dataKey="name" />
			<YAxis label={{ value: 'uv', angle: -90, position: 'insideLeft' }}/>
			<Legend />
			<Tooltip />

			<Line type="monotone" dataKey="uv" stroke="#8884d8" />
			<Line type="monotone" dataKey="pv" stroke="#33F" />
		</LineChart>
	);
}
