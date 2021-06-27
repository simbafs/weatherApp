import style from './style.module.css';

interface IWindProps {
	speed: string,
	direction: string
}

export default function Wind({speed, direction}: IWindProps){
	console.log(direction, parseInt(direction) - 180);
	return (
		<>
			<svg className={style.windDir} width="210" height="210" xmlns="http://www.w3.org/2000/svg">
				<g>
					<title>Wind Direction</title>
					<g transform={`rotate(${parseInt(direction) - 180}, 105, 105)`} strokeWidth="3" id="svg_5">
						<ellipse strokeWidth="3" ry="100" rx="100" id="svg_1" cy="105" cx="105" fill="#fff" />
						<line strokeWidth="3" id="svg_2" y2="169" x2="105" y1="41" x1="105" fill="none" />
						<line strokeWidth="3" id="svg_3" y2="71" x2="135" y1="41" x1="105" fill="none" />
						<line id="svg_4" y2="71" x2="75" y1="41" x1="105" strokeWidth="3" fill="none" />
					</g>
				</g>
			</svg>
			<h2 className={style.windSpeed}>{`${speed}m/s`}</h2>
		</>
	);
}
