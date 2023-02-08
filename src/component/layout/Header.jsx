import React from 'react';
import { Link } from "react-router-dom";

import headerStyle from "./headerStyle.module.css";

function Header(){
	const logo = <Link to='/'><img alt='profile' src='img/logo_profile.png' width={100}/></Link>

	return (
		<>
		<div className={headerStyle.headerWrap}>
			{/* 헤더 왼쪽 */}
			<div className={headerStyle.headerLeft}>
				{/* 로고 */}
				<div className={headerStyle.logoWrap}>
					{logo}
					<h2 className={headerStyle.title}>포도리<br/>Podo Lee</h2>

				</div>

			</div>
			{/* 메뉴 */}
			<div>
				<Link to='/toy'>토이 프로젝트</Link>

			</div>
			{/* 헤더 오른쪽 */}
			<div className={headerStyle.headerRight}>

			</div>
		</div>
		</>
	);
}

export default Header;