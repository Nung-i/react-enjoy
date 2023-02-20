import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import leftMenuStyle from "./leftMenuStyle.module.css";

function LeftMenu({title, leftMenuItems}){
	return (
		<div className={leftMenuStyle.wrap}>
			{/* 왼쪽 메뉴 타이틀 */}
			<h1>{title}</h1>
			{
				leftMenuItems.map((item, itemIndex) => (
					<div key={itemIndex}>
						<Link to={item.path}>{item.title}</Link>
					</div>
				))
			}
		</div>
	);
}

LeftMenu.propTypes = {
	title: PropTypes.string,
	leftMenuItems: PropTypes.array.isRequired,
}

export default LeftMenu;