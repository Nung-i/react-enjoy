/**
 * 0이상 1미만의 난수 생성하기
 */
const getRandom = () => {
	return Math.random();
}

/**
 * 
 * 두 값 사이의 난수 생성하기
 * min <= 난수 < max
 * 
 * @param {float} min 최솟값 이상
 * @param {float} max 최댓값 미만
 * @returns 
 */
const getRandomArbitrary = (min, max) => {
	return Math.random() * (max - min) + min;
}

/**
 * 
 * 최댓값 포함 두 값 사이의 난수 생성하기
 * min <= 난수 <= max
 * 
 * @param {float} min 최솟값 이상
 * @param {float} max 최댓값 미만
 * @returns 
 */
const getRandomArbitraryInclusive = (min, max) => {
	return Math.random() * (max - min) + min;
}

/**
 * 
 * 두 값 사이의 정수 난수 생성하기
 * min <= 난수 < max
 * 
 * @param {float} min 최솟값 이상
 * @param {float} max 최댓값 미만
 * @returns 
 */
const getRandomInt = (min, max) => {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min)) + min; //최댓값은 제외, 최솟값은 포함
}

/**
 * 최댓값을 포함하는 정수 난수 생성하기
 * min <= 난수 <= max
 * 
 * @param {float} min 최솟값 이상
 * @param {float} max 최댓값 이하
 * @returns 
 */
const getRandomIntInclusive = (min, max) => {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min; //최댓값도 포함, 최솟값도 포함
}

export { 
	getRandom, getRandomArbitrary, getRandomArbitraryInclusive, getRandomInt, getRandomIntInclusive 
};