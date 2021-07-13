import React from 'react';

// setMatches 1~v까지의 숫자가 하나씩 들어있는 배열 생성
const setMatches = (v) => Array.from({length: v}, (_,i) => i + 1);

let isShuffled = 0;

// shuffle 배열을 셔플
const shuffle = (arr) => {
    for (let i = arr.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    isShuffled++;
    return arr;
}

// createMatches 배열을 앞에서부터 두개씩 잘라 새 배열 생성
const createMatches = (v) => {
    const randomMatch = shuffle(setMatches(v));
    const arr = [];

    for (let i = 0; i < randomMatch.length; i += 2) {
        arr.push(randomMatch.slice(i, i + 2));
    }
    console.log(arr);
    return arr;
}

const sibalFUCKtionalComponent = () => { 
    const roundValue = 32;

    const draws = () => createMatches(roundValue);
    console.log(draws);
    const draw = () => draws.map((e, index) => {
        console.log("e[0] : " + e[0] + " / e[1] : " + e[1]);
        console.log('셔플 횟수 : ' + isShuffled);
        return (
            <div key={index}>1: {e[0]} / 2: {e[1]}</div>
        );
    });

    return ({draw});

}

export default sibalFUCKtionalComponent;