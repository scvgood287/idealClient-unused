import React, { memo, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles, ImageList, ImageListItem, ImageListItemBar } from '@material-ui/core';

import ICard from './ICard';

// DB Interface
// [
//   {
//     subject: String,
//     group: String,
//     name: String,
//     url: String,
//     firstTotal: {
//       first: Number,
//       enter: Number,
//       firstRate: Number
//     },
//     winTotal: {
//       win: Number,
//       lose: Number,
//       winRate: Number
//     }
//   }
// ]

// json 길이만큼 id들의 배열을 생성
const makeIds = (v) => Array.from({ length: v }, (_, i) => i);

// json 길이만큼의 id들의 배열을 셔플한 후, roundValue만큼 앞에서부터 잘라서 사용.
const getRandomIds = (arr, requestInfoCount) => {
	for (let i = arr.length - 1; i > 0; i--) {
		let j = Math.floor(Math.random() * (i + 1));
		[arr[i], arr[j]] = [arr[j], arr[i]];
	}
	return arr.slice(0, requestInfoCount);
}

// json에서 랜덤한 id들의 배열에 해당하는 데이터들을 불러옴
// 누락된 id가 있으면 image를 불러오지 못할 가능성이 있음
// id === index 임이 확실시 될 때만 사용.
// entriesInfo = [ { id: number, subject: ideal~, ..., }, { id: number, subject: ideal~, ..., } , ..., ]
// 후에 entriesInfo를 둘씩 묶고 draw에 넣어 [entriesInfo[0], entriesInfo[1]] / [entriesInfo[2], entriesInfo[3]] / ... / 식으로 한 뒤, 원하는 값을 사용
// 예) draw[0] = [entriesInfo[0], entriesInfo[1]], src=draw[0][0].url, draw[3][1].enter++, draw[4][0].first++, draw[7][1].win++, draw[8][0].lose++, ...
const getEntriesInfo = (jsonInfo, ids) => {
  const temp = [];
  ids.forEach((e) => {
    temp.push(jsonInfo[e]);
  })
  return temp;
}
// 배열을 vs 형태로 사용하기 쉽도록 둘씩 묶음
const makeDraw = (arr) => {
	const temp = [];
	for (let i = 0; i < arr.length; i += 2) {
		temp.push(arr.slice(i, i + 2));
	}
	return temp;
}
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
	const { match, info, idealType } = props;

	const [roundValue, setRoundValue] = useState(parseInt(match.params.value));
	const [winner, setWinner] = useState([]);
	const [index, setIndex] = useState(0);
  const [entriesInfo, setEntriesInfo] = useState(getEntriesInfo(info, getRandomIds(makeIds(info.length), roundValue)));
  const [draw, setDraw] = useState(makeDraw(entriesInfo));

  // useEffect(() => {
  //   const getIdealInfo = async ( type) => {
  //     try {
  //       console.log("effect");
  //       const res = await API.get(`/${type}`);
  //       setTestInfo(res.data[0].info);
  //       console.log(testInfo);
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   }

  //   getIdealInfo( idealType);
  // }, []);
  // setEntriesInfo(getEntriesInfo(info, getRandomIds(makeIds(infoLength), roundValue)));
  // setDraw(makeDraw(entriesInfo));

	const classes = useStyles();
  
	const handleIsWinner = (e) => {
    e.winTotal.win++;
    draw[index][1-draw[index].indexOf(e)].winTotal.lose++;
    if (roundValue === 2) {
      e.firstTotal.first++;
      entriesInfo.forEach((item) => {
        item.firstTotal.enter++;
        item.firstTotal.firstRate = Number(((item.firstTotal.first * 100) / item.firstTotal.enter).toFixed(2));
        item.winTotal.winRate = Number(((item.winTotal.win * 100) / (item.winTotal.win + item.winTotal.lose)).toFixed(2));
      })
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
              <ICard img={item[0].url} value={`그룹 : ${item[0].group} / 이름 : ${item[0].name}`} />
              <ImageListItemBar title={`그룹 : ${item[0].group} / 이름 : ${item[0].name}`} />
            </ImageListItem>
            <ImageListItem key={item[1].url} onClick={() => handleIsWinner(item[1])}>
              <ICard img={item[1].url} value={`그룹 : ${item[1].group} / 이름 : ${item[1].name}`} />
              <ImageListItemBar title={`그룹 : ${item[1].group} / 이름 : ${item[1].name}`} />
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
                  idealType: idealType,
                  info: info,
                },
              }} >
              <ImageListItem key={item[0].url}>
                <ICard img={item[0].url} value={`그룹 : ${item[0].group} / 이름 : ${item[0].name}`} />
                <ImageListItemBar title={`그룹 : ${item[0].group} / 이름 : ${item[0].name}`} />
              </ImageListItem>
            </Link>
            <Link onClick={() => handleIsWinner(item[1])} key={item[1].url} style={linkStyle}
              to={{
                pathname: `/result`,
                state: {
                  winner: item[1],
                  idealType: idealType,
                  info: info,
                },
              }} >
              <ImageListItem key={item[1].url}>
                <ICard img={item[1].url} value={`그룹 : ${item[1].group} / 이름 : ${item[1].name}`} />
                <ImageListItemBar title={`그룹 : ${item[1].group} / 이름 : ${item[1].name}`} />
              </ImageListItem>
            </Link>
          </ImageList>
			  </div>
      )
    }
	}
  
	return (
		<div>
			<h1>{idealType}</h1>
			<h2>{(roundValue === 2) ? "결승전" : roundValue}</h2>
      {(index === (roundValue/2)) ? matchUp(draw[index-1]) : matchUp(draw[index])}
		</div>
	);

}

export default memo(IdealGames);