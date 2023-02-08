import { BrowserRouter } from 'react-router-dom';

import './App.css';
import Content from './component/layout/Content';

import Header from "./component/layout/Header";

function App() {
return (
	<>
		<BrowserRouter>
			{/* 헤더 */}
			<Header/>
			{/* 컨텐츠 */}
			<Content/>

		</BrowserRouter>
	</>
);
}

export default App;
