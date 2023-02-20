import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import HomeStyle from './home.module.scss'

function Home(){
	/* 로고 */
	const logo = <Link to='/toy/netflix?isLayout=false'><img alt='profile' src='/img/netflix/netflix_logo.png' className={HomeStyle.logo} width={100}/></Link>

	/* 영화진흥원 API */
	// const 영화진흥원Url = `http://kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchWeeklyBoxOfficeList.json?key=f5eef3421c602c6cb7ea224104795888&targetDt=20230219&weekGb=0`
	const [movieList, setMovieList] = useState([
		// {
		// 	audiAcc: "862955",	// 누적관객수를 출력합니다.
		// 	audiChange: "100.0", 	// 전일 대비 관객수 증감 비율을 출력합니다.
		// 	audiCnt: "862955", 	// 해당일의 관객수를 출력합니다.
		// 	audiInten: "862955", 	// 전일 대비 관객수 증감분을 출력합니다.
		// 	movieCd: "20230209", 	// 영화의 대표코드를 출력합니다.
		// 	movieNm: "앤트맨과 와스: 텀매니아", 	// 영화명(국문)을 출력합니다.
		// 	openDt: "2023-02-15", 	// 영화의 개봉일을 출력합니다.
		// 	rank: "1", 	// 해당일자의 박스오피스 순위를 출력합니다.
		// 	rankInten: "0", 	// 전일대비 순위의 증감분을 출력합니다.
		// 	rankOldAndNew: "NEW", 	// 랭킹에 신규진입여부를 출력합니다. “OLD” : 기존 , “NEW” : 신규
		// 	rnum: "1", 	// 순번을 출력합니다.
		// 	salesAcc: "9230480906", 	// 누적매출액을 출력합니다.
		// 	salesAmt: "9230480906", 	// 해당일의 매출액을 출력합니다.
		// 	salesChange: "100.0", 	// 전일 대비 매출액 증감 비율을 출력합니다.
		// 	salesInten: "9230480906", 	// 전일 대비 매출액 증감분을 출력합니다.
		// 	salesShare: "45.2", 	// 해당일자 상영작의 매출총액 대비 해당 영화의 매출비율을 출력합니다.
		// 	scrnCnt: "2090", 	// 해당일자에 상영한 스크린수를 출력합니다.
		// 	showCnt: "44142", 	// 해당일자에 상영된 횟수를 출력합니다.
		// }
	]);

	useEffect(() => {
		// fetch(영화진흥원Url, {
		// 	method: 'GET',

		// })
		// .then((res) => res.json())
		// .then((res) => {
		// 	if(res.boxOfficeResult.weeklyBoxOfficeList != null){
		// 		setMovieList((prev) => {
		// 			console.log(...prev);
		// 			return [...res.boxOfficeResult.weeklyBoxOfficeList];

		// 		});

		// 	}
			
		// });

		setMovieList((prev) => {
			return [...prev, ...getMovieList()];
		});

	}, []);

	const [movieContentsPopularCarouselSlateX, setMovieContentsPopularCarouselSlateX] = useState('');

	function nextItemList(event){
		setMovieContentsPopularCarouselSlateX((prev) => {
			let slateXVal = prev - 1776;
			return `${slateXVal}px`;
		});
		console.log(event.target.style.translate = ['-1776px', '0']);
		console.log(event.target.style.translate);
		// event.target.style.transform.translateX = -1700;
		// event.target.animate({
		// 	transform: 'translateX(-1700px)'
		// });

	}

	return (
		<>
		<div className={HomeStyle.container}>
			<div className={HomeStyle.headerWrap}>
				{/* 헤더 왼쪽 */}
				<div className={HomeStyle.headerLeft}>
					{/* 로고 */}
					<div className={HomeStyle.logoWrap}>
						{logo}
					</div>

					{/* 메뉴 */}
					<div className={HomeStyle.headerMenu}>
						<Link to='/toy/netflix?isLayout=false' className={HomeStyle.item}>홈</Link>
						<Link to='/toy/netflix?isLayout=false' className={HomeStyle.item}>시리즈</Link>
						<Link to='/toy/netflix?isLayout=false' className={HomeStyle.item}>영화</Link>
						<Link to='/toy/netflix?isLayout=false' className={HomeStyle.item}>NEW! 요즘 대세 콘텐츠</Link>
						<Link to='/toy/netflix?isLayout=false' className={HomeStyle.item}>내가 찜한 콘텐츠</Link>
						<Link to='/toy/netflix?isLayout=false' className={HomeStyle.item}>언어별로 찾아보기</Link>

					</div>

				</div>

				{/* 헤더 오른쪽 */}
				<div className={HomeStyle.headerRight}>
					검색
				</div>
			</div>

			{/* 넷플릭스 인기 콘텐츠 */}
			<div className={HomeStyle.movieContentsPopular}>
				<h1 className={HomeStyle.title}>넷플릭스 인기 콘텐츠</h1>

				{/* 캐러셀 */}
				<ul className={`${HomeStyle.carousel}`} style={{ transform: `translateX(${movieContentsPopularCarouselSlateX})` }} >
					{movieList.map((movieItem) => {
						return (
							<li className={`${HomeStyle.item} ${HomeStyle[`${movieItem.status}`]}`}>
								<Link to={`/toy/netflix/detail/${movieItem.id}?isLayout=false`} className={HomeStyle.link}>
									<img alt={`${movieItem.mvNm}`} src={`${movieItem.thumbPath}`} width={286} className={HomeStyle.thumbnail}/>
								</Link>
								{
									movieItem.status==='next'
									&& <button className={HomeStyle.moveBtn} onClick={nextItemList}>&gt;</button>
								}
							</li>
						);
					})}
				</ul>
			</div>

		</div>
		</>
	);
}

function getMovieList(){
	const movieList = [
		getMovieDetail(0, '그린마더스클럽', '/img/netflix/thumbnail/그린마더스클럽.jpg', 'active'),
		getMovieDetail(1, '김비서가 왜 그럴까', '/img/netflix/thumbnail/김비서가 왜 그럴까.jpg', 'active'),
		getMovieDetail(2, '나는 솔로', '/img/netflix/thumbnail/나는 솔로.jpg', 'active'),
		getMovieDetail(3, '내일', '/img/netflix/thumbnail/내일.jpg', 'active'),
		getMovieDetail(4, '동감', '/img/netflix/thumbnail/동감.jpg', 'active'),
		getMovieDetail(5, '미스터 션샤인', '/img/netflix/thumbnail/미스터 션샤인.jpg', 'active'),
		getMovieDetail(6, '사랑의 이해', '/img/netflix/thumbnail/사랑의 이해.jpg', 'next'),
		getMovieDetail(7, '서른, 아홉', '/img/netflix/thumbnail/서른, 아홉.jpg', ''),
		getMovieDetail(8, '스마트폰을 떨어뜨렸을 뿐인데', '/img/netflix/thumbnail/스마트폰을 떨어뜨렸을 뿐인데.jpg', ''),
		getMovieDetail(9, '슬램덩크', '/img/netflix/thumbnail/슬램덩크.jpg', ''),
		getMovieDetail(10, '연예의참견', '/img/netflix/thumbnail/연예의참견.jpg', ''),
		getMovieDetail(11, '용감한 형사들', '/img/netflix/thumbnail/용감한 형사들.jpg', ''),
		getMovieDetail(12, '우리들의 블루스', '/img/netflix/thumbnail/우리들의 블루스.jpg', ''),
		getMovieDetail(13, '이상한 변호사 우영우', '/img/netflix/thumbnail/이상한 변호사 우영우.jpg', ''),
		getMovieDetail(14, '최강야구', '/img/netflix/thumbnail/최강야구.jpg', ''),
		getMovieDetail(15, '환혼', '/img/netflix/thumbnail/환혼.jpg', ''),
	];

	return movieList;

}

function getMovieDetail(id, mvNm, thumbPath, status){
	const movieDetail = {
		id: id,
		mvNm: mvNm,
		thumbPath: thumbPath,
		status: status,
	};

	return movieDetail;

}

export default Home;