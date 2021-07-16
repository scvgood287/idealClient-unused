import React, { memo } from 'react';
import { ImageListItem, ImageListItemBar } from '@material-ui/core';
import { Link } from 'react-router-dom';
import _ from 'lodash';

import ICard from 'components/ICard';

const sortBy = (key, data, length) => {
  return (data.sort((a, b) => {
    if (key === 'firstRate') {
      return b.firstRate - a.firstRate;
    } else if (key === 'winRate') {
      return b.winRate - a.winRate;
    }
  })).slice(0, length);
}

const rateBy = (key, sortedData) => {
  if (key === 'firstRate') {
    return (
      <ul>
        {sortedData.map((e, i) => (
          <li>
            {`${i+1}등 : ${e.value} 우승 확률 : ${e.firstRate}%`}
          </li>
        ))}
      </ul>
    )
  } else if (key === 'winRate') {
    return (
      <ul>
        {sortedData.map((e, i) => (
          <li>
            {`${i+1}등 : ${e.value} 승률 : ${e.winRate}%`}
          </li>
        ))}
      </ul>
    )
  }
}

const idealResult = (props) => {
    const { location } = props;

    // 현재는 서버가 없으므로 IdealGames.js에서의 결과(A)만으로 테스트하지만
    // 서버가 생기면 IdealGames.js에서의 결과(A) + 원본 데이터(B) 가 적용되어 합쳐진 데이터(C)를
    // IdealGames.js에서 서버로 옮겨 업데이트 한 후,
    // 다시 idealResult 페이지에서 업데이트한 데이터(C)를 요청해 사용할 예정.

    const state = location.state;
    const winner = state.winner;
    // const mockData = [
    //   { firstRate: 26, winRate: 16, },
    //   { firstRate: 96, winRate: 65, },
    //   { firstRate: 60, winRate: 4, },
    //   { firstRate: 52, winRate: 60, },
    //   { firstRate: 62, winRate: 95, }
    // ];
    const sortedByFirstRate = sortBy('firstRate', _.cloneDeep(state.data), 20);
    const sortedByWinRate = sortBy('winRate', _.cloneDeep(state.data), 20);
    const rateByFirst = rateBy('firstRate', sortedByFirstRate);
    const rateByWin = rateBy('winRate', sortedByWinRate);

    return (
      <>
        <ImageListItem>
            <ICard img={winner.url} value={winner.value} />
            <ImageListItemBar title={winner.value} />
        </ImageListItem>
        {rateByFirst}
        {rateByWin}
        <Link to={'/'}>다시하기</Link>
        <br />
        <div></div>
        <br />
        <br />
        {/* 이 밑의 링크는 전체게임이 아닌 현재 게임 */}
        <Link to={'/'}>더 알아보기</Link>
        <div>SNS 공유</div>
        <div>URL복사</div>
      </>    
    );
}

export default memo(idealResult);