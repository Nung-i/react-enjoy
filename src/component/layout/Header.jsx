import React from 'react';
import { Link } from "react-router-dom";

import headerStyle from "./headerStyle.module.css";

function Header(){
	const logo = <Link to='/'><img alt='profile' src='img/logo_profile.png' width={100}/></Link>

	return (
		<>
		<div className={headerStyle.headerWrap}>
			<div className={headerStyle.headerLeft}>
				<div className={headerStyle.logoWrap}>
					{logo}
					<h2 className={headerStyle.title}>포도리<br/>Podo Lee</h2>

				</div>

			</div>
			<div>
				<Link to='/toy'>Toy Project</Link>

			</div>
			<div className={headerStyle.headerRight}>

			</div>
		</div>
		</>
	);
}

export default Header;