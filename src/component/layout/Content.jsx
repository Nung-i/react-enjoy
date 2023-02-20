import React from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import LeftMenu from './LeftMenu';
import SnowSelf from '../../toy/snow/SnowSelf';
import contentStyle from './content.module.css';

function Content(){
	/**
	 * 왼쪽 메뉴
	 */
	const toyLeftMenuItems = [
		{
			title: '하늘에서 눈이 내려와요~',
			path: '/toy/snowing',
		},
		{
			title: 'netflix 따라하기',
			path: '/toy/netflix_link',
		},
	];

	return (
		<div className={contentStyle.wrap}>
			<Routes>
				{/* 메인 */}
				<Route path='/' element={<div>메인입니다.</div>}/>
				{/* 토이 프로젝트 */}
				<Route path='toy/*' element={<><LeftMenu title={"프로젝트들..."} leftMenuItems={toyLeftMenuItems}/><Outlet/></>}>
					<Route path='snowing' element={<><SnowSelf/></>} />
					<Route path='netflix_link' element={<><a href='/toy/netflix?isLayout=false' target={'_blank'}>넷플릭스 바로가기</a></>} />
				</Route>
			</Routes>
		</div>
	);
}

export default Content;