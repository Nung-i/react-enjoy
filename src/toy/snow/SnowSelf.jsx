import React, { useEffect, useState } from 'react';

import snowSelfStyle from "./snowSelfStyle.module.css";

import { getRandomArbitraryInclusive } from "../../util/commonUtil";

/**
 * HTML, CSS, JS 만 사용해서 눈 내리는 화면 만들기. 
 * Youtube 영상 따라하기 전에 혼자해보기.
 * 
 * @returns 
 */
function SnowSelf(){
	const [snow, setSnow] = useState([]);

	/**
	 * 
	 * @param {int} size 눈의 크기 | 범위[20 ~ 50]
	 * @param {float} opacity 눈의 투명도 | 범위[0.3 ~ 0.8]
	 * @param {float} x 눈이 떨어질 위치 % | 범위[10 ~ 90] | 화면 왼쪽 기준
	 * @param {float} speed 눈이 떨어지는 속도 | 범위[5 ~ 15] | 작을 수록 빠름
	 */
	const makeSnow = (size, opacity, x, speed) => {
		const borderRadius = Math.ceil(size / 2);

		const snowStyle = {
			width: `${size}px`,
			height: `${size}px`,
			borderRadius: `${borderRadius}px`,
			opacity: opacity,
			left: `${x}%`,
			animationDuration: `${speed}s`,
		}

		const snowElem = <div key={snow.toString()} className={snowSelfStyle.snow} style={snowStyle}></div>;

		setSnow([...snow, snowElem]);

	}

	useEffect(() => {
		setTimeout(() => {
			const size = Number(getRandomArbitraryInclusive(20, 50).toFixed(1));
			const opacity = Number(getRandomArbitraryInclusive(0.3, 0.8).toFixed(1));
			const x = Number(getRandomArbitraryInclusive(3, 98).toFixed(2));
			const speed = Number(getRandomArbitraryInclusive(5, 15).toFixed(2));

			makeSnow(size, opacity, x, speed);
			
		}, 100);

	});

	return (
		<div className={snowSelfStyle.background} id='snow_background'>
			{/* <div className={snowSelfStyle.snow}>

			</div> */}

			{snow}

		</div>
	);
}

export default SnowSelf;