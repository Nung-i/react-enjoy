import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.css';

import Header from "./component/layout/Header";
import SnowSelf from "./toy/snow/SnowSelf";

function App() {
return (
	<>
		<BrowserRouter>
			<Header/>
			<Routes>
				<Route path='/' element={<div>메인입니다.</div>}/>
				<Route path='/toy' element={<SnowSelf/>}/>
			</Routes>
		</BrowserRouter>
	</>
);
}

export default App;
