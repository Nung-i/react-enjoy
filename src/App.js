import { Routes, Route, useSearchParams } from 'react-router-dom';

import './App.css';
import Content from './component/layout/Content';

import Header from "./component/layout/Header";
import Home from "./toy/netflix/Home";

function App() {
	const [searchParams, setSearchParams] = useSearchParams();

	let isLayout = searchParams.get('isLayout');
	isLayout = (isLayout==='false') ? false : true;
	
	return (
		<>
			{
				isLayout
				? /* layout을 이용한 뷰 */
				<>
					{/* 헤더 */}
					<Header/>
					{/* 컨텐츠 */}
					<Content/>
				</>

				: /* layout없이 단독 */
				<Routes>
					<Route path='/toy/netflix' element={<Home/>}></Route>
				</Routes>

			}
		</>
	);
}

export default App;
