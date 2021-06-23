import style from './style.module.css';

interface IWindProps {
	speed: string,
	direction: string
}

export default function Wind({speed, direction}: IWindProps){
	return (
		<>
			<svg width="210" height="210" xmlns="http://www.w3.org/2000/svg">
				<g>
					<title>Wind Direction</title>
					<g transform={`rotate(${direction}, 105, 105)`} stroke-width="3" id="svg_5">
						<ellipse stroke-width="3" ry="100" rx="100" id="svg_1" cy="105" cx="105" stroke="#000" fill="#fff" />
						<line stroke-width="3" stroke-linecap="undefined" stroke-linejoin="undefined" id="svg_2" y2="169" x2="105" y1="41" x1="105" stroke="#000" fill="none" />
						<line stroke-width="3" stroke-linecap="undefined" stroke-linejoin="undefined" id="svg_3" y2="71" x2="135" y1="41" x1="105" stroke="#000" fill="none" />
						<line stroke-linecap="undefined" stroke-linejoin="undefined" id="svg_4" y2="71" x2="75" y1="41" x1="105" stroke-width="3" stroke="#000" fill="none" />
					</g>
				</g>
			</svg>
			<h2 className={style.windSpeed}>{`${speed}m/s`}</h2>
		</>
	);
}