import React, { memo, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles, ImageList, ImageListItem, ImageListItemBar } from '@material-ui/core';

import ICard from './ICard';

// roundValue만큼 id들의 배열 반환
// const makeIds = (v) => Array.from({ length: v }, (_, i) => i);

// // 반환 받은 roundValue만큼 id들의 배열을 섞음
// const shuffle = (arr) => {
// 	for (let i = arr.length - 1; i > 0; i--) {
// 		let j = Math.floor(Math.random() * (i + 1));
// 		[arr[i], arr[j]] = [arr[j], arr[i]];
// 	}
// 	return arr;
// }
// // json에서 랜덤한 roundValue만큼의 id들로 조회한 후, 일치한 data들의 index로 이루어진 배열을 반환
// // data들의 id === index일 경우 생략.
// const getEntriesIndex = (jsonData, ids) => {
//   const temp = ids.map((e) => {
//     const getEntriesIndexByIds = (item) => {
//       return item.id === e;
//     }
//     return jsonData.findIndex(getEntriesIndexByIds);
//   });
//   return temp;
// }

// getEntriesIndex로 반환 받은 index들의 배열을 통해 json에서 해당하는 data들을 반환받음
// entriesData = [ { id: number, subject: ideal~, ..., }, { id: number, subject: ideal~, ..., } , ..., ]
// 후에 entriesData를 둘씩 묶고 draw에 넣어 [entriesData[0], entriesData[1]] / [entriesData[2], entriesData[3]] / ... / 식으로 한 뒤, 원하는 값을 사용
// 예) draw[0] = [entriesData[0], entriesData[1]], src=draw[0][0].url, draw[3][1].enter++, draw[4][0].first++, draw[7][1].win++, draw[8][0].lose++, ...
const getEntriesData = (jsonData, requestDataCount) => {
  const temp = [];
  for (let i = 0; i < requestDataCount; i++) {
    temp.push(jsonData[i]);
  }
  return temp;

  // const temp = ids.map((e) => {
  //   return jsonData[e];
  // })
  // return temp;

  // const temp = indices.map((e) => {
  //   return jsonData[e];
  // })
  // return temp;
}
// 배열을 vs 형태로 사용하기 쉽도록 둘씩 묶음
const makeDraw = (arr) => {
	const temp = [];
	for (let i = 0; i < arr.length; i += 2) {
		temp.push(arr.slice(i, i + 2));
	}
	return temp;
}
// 서버에 데이터 반환
// Test에선 다음에 다른 순서로 받아오기 위해 랜덤한 순서로 반환
// const returnData = (data, type) => {
//   const fs = require('browserify-fs');
//   const PATH = 'Users/gu/refactoring-app/src';
//   const shuffleData = shuffle(data);
//   fs.writeFile(`${PATH}/shared/test${type.replace('ideal', '')}Json.json`, shuffleData, error => {
//     if (error) console.log(error);
//   });
// }
// styles
const linkStyle = {
	textDecoration: 'none',
}
const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
		flexWrap: 'wrap',
		justifyContent: 'space-around',
		overflow: 'hidden',
		backgroundColor: theme.palette.background.paper,
	},
	imageList: {
		display: 'grid',
		gridTemplateColumns: 'repeat(2, minmax(50%, 50%))',
		gridTemplateRows: 'repeat(2, minmax(50%, 50%))',
		width: 500,
		height: 450,
	},
}));

const IdealGames = (props) => {
	const { match, data } = props;

	const [roundValue, setRoundValue] = useState(parseInt(match.params.value));
	const [winner, setWinner] = useState([]);
	const [index, setIndex] = useState(0);
  // const [entriesId, setEntriesId] = useState(makeIds(roundValue));
  // const entriesIndex = getEntriesIndex(data, entriesId);
  const [entriesData, setEntriesData] = useState(getEntriesData(data, roundValue));
  const [draw, setDraw] = useState(makeDraw(entriesData));

	const classes = useStyles();
	const gameValue = useMemo(() => (match.url.replaceAll(roundValue, '').replaceAll('/', '')), []);
  
	const handleIsWinner = (e) => {
    e.win++;
    draw[index][1-draw[index].indexOf(e)].lose++;
    if (roundValue === 2) {
      e.first++;
      entriesData.forEach((item) => {
        item.enter++;
        item.firstRate = Number(((item.first * 100) / item.enter).toFixed(2));
        item.winRate = Number(((item.win * 100) / (item.win + item.lose)).toFixed(2));
      })
      console.log(data);
      // 서버로 결과가 적용된 entriesData 넘겨줌
      // returnData(entriesData, gameValue);
    }
    setWinner(winner.concat(e));
    setIndex(index + 1);
	}

  if (index >= (roundValue / 2)) {
    setRoundValue(roundValue / 2);
    setDraw(makeDraw(winner));
    setIndex(0);
    if (roundValue !== 2) {
      setWinner([]);
    }
  }

	const matchUp = (item) => {
    if (roundValue > 2) {
      return (
        <div className={classes.root}>
          <ImageList rowHeight={180} className={classes.imageList}>
            <ImageListItem key={item[0].url} onClick={() => handleIsWinner(item[0])}>
              <ICard img={item[0].url} value={item[0].value} />
              <ImageListItemBar title={item[0].value} />
            </ImageListItem>
            <ImageListItem key={item[1].url} onClick={() => handleIsWinner(item[1])}>
              <ICard img={item[1].url} value={item[1].value} />
              <ImageListItemBar title={item[1].value} />
            </ImageListItem>
          </ImageList>
			  </div>
      )
    } else if (roundValue === 2) {
      return (
        <div className={classes.root}>
          <ImageList rowHeight={180} className={classes.imageList}>
            <Link onClick={() => handleIsWinner(item[0])} key={item[0].url} style={linkStyle}
              to={{
                pathname: `/result`,
                state: {
                  winner: item[0],
                  type: gameValue,
                  data: data,
                },
              }} >
              <ImageListItem key={item[0].url}>
                <ICard img={item[0].url} value={item[0].value} />
                <ImageListItemBar title={item[0].value} />
              </ImageListItem>
            </Link>
            <Link onClick={() => handleIsWinner(item[1])} key={item[1].url} style={linkStyle}
              to={{
                pathname: `/result`,
                state: {
                  winner: item[1],
                  type: gameValue,
                  data: data,
                },
              }} >
              <ImageListItem key={item[1].url}>
                <ICard img={item[1].url} value={item[1].value} />
                <ImageListItemBar title={item[1].value} />
              </ImageListItem>
            </Link>
          </ImageList>
			  </div>
      )
    }
	}

	return (
		<div>
			<h1>{gameValue}</h1>
			<h2>{(roundValue === 2) ? "결승전" : roundValue}</h2>
      {(index === (roundValue/2)) ? matchUp(draw[index-1]) : matchUp(draw[index])}
		</div>
	);

}

export default memo(IdealGames);