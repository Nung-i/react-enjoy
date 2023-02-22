import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import HomeStyle from './home.module.scss'

function Home(){
	/* 로고 */
	const logo = <Link to='/toy/netflix?isLayout=false'><img alt='profile' src='/img/netflix/netflix_logo.png' className={HomeStyle.logo} width={100}/></Link>

	/* 인기콘텐츠 */
	const [popularContents, setPopularContents] = useState({
		list: [],
		page: 1, // 페이지
		totalPage: 1, // 전체 페이지
		totalCnt: 0, // 리스트 총 갯수
		viewCnt: 6, // 보여줄 아이템 갯수
		translateX: 0, // [임시] 캐러셀 이동할 px | transform: translateX(값)
	});

	useEffect(() => {
		/* 인기콘텐츠 리스트 세팅 */
		setPopularContents((prevPopularContents) => {
			/* 인기콘텐츠 클론 */
			const clonePopularContents = {...prevPopularContents};
			/* [U] 리스트 */
			clonePopularContents.list = getMovieList();
			/* 리스트 갯수 */
			const movieListCnt = clonePopularContents.list.length;
			/* [U] 전체 페이지 */
			clonePopularContents.totalPage = Math.ceil(movieListCnt / clonePopularContents.viewCnt);
			/* [U] 리스트 총 갯수 */
			clonePopularContents.totalCnt = movieListCnt;

			return clonePopularContents;

		});

	}, []);

	/* 캐러셀 다음 페이지 */
	function moveItemList(status, event){
		/* 인기콘텐츠 아이템 이미지 크기 */
		const popularMovieItemWidth = 296;

		setPopularContents((prevPopularContents) => {
			/* 인기콘텐츠 클론 */
			const clonePopularContents = {...prevPopularContents};
			/* 보여줄 아이템 갯수 */
			const cloneViewCnt = clonePopularContents.viewCnt;
			const cloneTotalCnt = clonePopularContents.totalCnt;
			const cloneTranslateX = clonePopularContents.translateX;
			const clonePage = clonePopularContents.page;
			const cloneTotalPage = clonePopularContents.totalPage;

			let activeIdxMin = 0; // active 최소 index
			let activeIdxMax = 0; // active 최대 index
			let changePage = 0; // 바뀔 페이지

			/* [U] 페이지 +1 OR -1 */
			if( status==='next' ){ 	// 다음 페이지
				changePage = clonePage + 1;
				clonePopularContents.page = changePage;

			}else if( status==='prev' ){ 	// 이전 페이지
				changePage = clonePage - 1;
				clonePopularContents.page = changePage;
				
			}

			activeIdxMin = (changePage * cloneViewCnt) - cloneViewCnt;
			activeIdxMax = (changePage * cloneViewCnt) - 1;

			let moveItemCnt = (activeIdxMax - activeIdxMin) + 1;

			/* 범위 넘지 않게 */
			if( activeIdxMin < 0 ){
				activeIdxMin = 0

			}
			if( activeIdxMax >= cloneTotalCnt ){
				activeIdxMin = activeIdxMin - (activeIdxMax - cloneTotalCnt) - 1;
				activeIdxMax = cloneTotalCnt - 1;
				moveItemCnt = moveItemCnt - ((changePage * cloneViewCnt) - cloneTotalCnt);

			}

			if( clonePage===cloneTotalPage ){
				moveItemCnt = moveItemCnt - ((cloneTotalPage * cloneViewCnt) - cloneTotalCnt);

			}

			/* prev, active, next 초기화 */
			let resetActiveIdxMin = 0; // active 최소 index
			let resetActiveIdxMax = 0; // active 최대 index

			if( status==='next' ){ 	// 다음 페이지
				resetActiveIdxMax = activeIdxMin - 1;
				resetActiveIdxMin = (resetActiveIdxMax-cloneViewCnt) + 1;

			}else if( status==='prev' ){ 	// 이전 페이지
				resetActiveIdxMax = activeIdxMin + 1;
				resetActiveIdxMin = (resetActiveIdxMax + cloneViewCnt) - 1;
				
			}

			/* 범위 넘지 않게 */
			if( resetActiveIdxMin < 0 ){
				resetActiveIdxMin = 0

			}
			if( resetActiveIdxMax >= cloneTotalCnt ){
				resetActiveIdxMax = cloneTotalCnt - 1;

			}

			/* prev, next 초기화 */
			if( (resetActiveIdxMin - 1) >= 0 && (resetActiveIdxMin - 1) < cloneTotalCnt ){
				clonePopularContents.list[(resetActiveIdxMin - 1)].status = '';

			}
			if( (resetActiveIdxMax + 1) >= 0 && (resetActiveIdxMax + 1) < cloneTotalCnt ){
				clonePopularContents.list[(resetActiveIdxMax + 1)].status = '';

			}

			/* active 초기화 */
			console.log('activeIdxMin', activeIdxMin);
			console.log('activeIdxMax', activeIdxMax);
			console.log('resetActiveIdxMin', resetActiveIdxMin);
			console.log('resetActiveIdxMax', resetActiveIdxMax);
			for( let resetActiveIdx=resetActiveIdxMin; resetActiveIdx<=resetActiveIdxMax; resetActiveIdx++ ){
				if( resetActiveIdx<0 ){
					break;

				}
				clonePopularContents.list[resetActiveIdx].status = '';

			}

			/* [U] active */
			for( let activeIdx=activeIdxMin; activeIdx<=activeIdxMax; activeIdx++ ){
				clonePopularContents.list[activeIdx].status = 'active';

			}

			/* [U] prev, next */
			let prevIdx = activeIdxMin - 1;
			let nextIdx = activeIdxMax + 1;

			if( prevIdx < 0 ){
				prevIdx = cloneTotalCnt - 1;

			}
			if( nextIdx >= cloneTotalCnt ){
				nextIdx = 0;

			}
			
			clonePopularContents.list[prevIdx].status = 'prev';
			clonePopularContents.list[nextIdx].status = 'next';

			/* [U] 캐러셀 이동할 px | transform: translateX(값) | 식: 기존값 +- (인기콘텐츠 아이템 이미지 크기 x 이동시켜야할 아이템 갯수) */
			if( status==='next' ){ 	// 다음 페이지
				clonePopularContents.translateX = cloneTranslateX  - (popularMovieItemWidth * moveItemCnt);
				
			}else if( status==='prev' ){ 	// 이전 페이지
				clonePopularContents.translateX = cloneTranslateX + (popularMovieItemWidth * moveItemCnt);
				
			}

			// 4개 3페이지 16 10~15 18 - 16 

			return clonePopularContents;
			
		});

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
				<ul className={`${HomeStyle.carousel}`} style={{ transform: `translateX(${popularContents.translateX}px)` }} >
					{popularContents.list.map((movieItem) => {
						return (
							<li key={movieItem.idx} className={`${HomeStyle.item}`}>
								{
									(movieItem.status==='prev')
									&& <button className={`${HomeStyle.moveBtn} ${HomeStyle.prevMoveBtn}`} onClick={moveItemList.bind(this, movieItem.status)}>&lt;</button>
								}
								<Link to={`/toy/netflix/detail/${movieItem.idx}?isLayout=false`} className={HomeStyle.link}>
									<img alt={`${movieItem.mvNm}`} src={`${movieItem.thumbPath}`} width={286} className={HomeStyle.thumbnail}/>
								</Link>
								{
									(movieItem.status==='next')
									&& <button className={`${HomeStyle.moveBtn} ${HomeStyle.nextMoveBtn}`} onClick={moveItemList.bind(this, movieItem.status)}>&gt;</button>
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
		setMovieDetail(0, '그린마더스클럽', '/img/netflix/thumbnail/그린마더스클럽.jpg', 'active'),
		setMovieDetail(1, '김비서가 왜 그럴까', '/img/netflix/thumbnail/김비서가 왜 그럴까.jpg', 'active'),
		setMovieDetail(2, '나는 솔로', '/img/netflix/thumbnail/나는 솔로.jpg', 'active'),
		setMovieDetail(3, '내일', '/img/netflix/thumbnail/내일.jpg', 'active'),
		setMovieDetail(4, '동감', '/img/netflix/thumbnail/동감.jpg', 'active'),
		setMovieDetail(5, '미스터 션샤인', '/img/netflix/thumbnail/미스터 션샤인.jpg', 'active'),
		setMovieDetail(6, '사랑의 이해', '/img/netflix/thumbnail/사랑의 이해.jpg', 'next'),
		setMovieDetail(7, '서른, 아홉', '/img/netflix/thumbnail/서른, 아홉.jpg', ''),
		setMovieDetail(8, '스마트폰을 떨어뜨렸을 뿐인데', '/img/netflix/thumbnail/스마트폰을 떨어뜨렸을 뿐인데.jpg', ''),
		setMovieDetail(9, '슬램덩크', '/img/netflix/thumbnail/슬램덩크.jpg', ''),
		setMovieDetail(10, '연예의참견', '/img/netflix/thumbnail/연예의참견.jpg', ''),
		setMovieDetail(11, '용감한 형사들', '/img/netflix/thumbnail/용감한 형사들.jpg', ''),
		setMovieDetail(12, '우리들의 블루스', '/img/netflix/thumbnail/우리들의 블루스.jpg', ''),
		setMovieDetail(13, '이상한 변호사 우영우', '/img/netflix/thumbnail/이상한 변호사 우영우.jpg', ''),
		setMovieDetail(14, '최강야구', '/img/netflix/thumbnail/최강야구.jpg', ''),
		setMovieDetail(15, '환혼', '/img/netflix/thumbnail/환혼.jpg', ''),
	];

	return movieList;

}

function setMovieDetail(idx, mvNm, thumbPath, status){
	const movieDetail = {
		idx: idx,
		mvNm: mvNm,
		thumbPath: thumbPath,
		status: status,
	};

	return movieDetail;

}

export default Home;