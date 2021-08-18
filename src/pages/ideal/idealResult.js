import React, { memo, useEffect } from 'react';
import { ImageListItem, ImageListItemBar } from '@material-ui/core';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import API from 'server/api';

import ICard from 'components/ICard';

const sortBy = (key, info, length) => {
  return (info.sort((a, b) => {
    if (key === 'firstRate') {
      return b.firstTotal.firstRate - a.firstTotal.firstRate;
    } else if (key === 'winRate') {
      return b.winTotal.winRate - a.winTotal.winRate;
    }
  })).slice(0, length);
}

const rateBy = (key, sortedInfo) => {
  if (key === 'firstRate') {
    return (
      <ul>
        {sortedInfo.map((e, i) => (
          <li key={e.url}>
            {`${i+1}등 : ${`그룹 : ${e.group} / 이름 : ${e.name}`} 우승 확률 : ${e.firstTotal.firstRate}%`}
          </li>
        ))}
      </ul>
    )
  } else if (key === 'winRate') {
    return (
      <ul>
        {sortedInfo.map((e, i) => (
          <li key={e.url}>
            {`${i+1}등 : ${`그룹 : ${e.group} / 이름 : ${e.name}`} 승률 : ${e.winTotal.winRate}%`}
          </li>
        ))}
      </ul>
    )
  }
}

const IdealResult = (props) => {
    const { location } = props;

    const { state } = location;
    const { winner, idealType, info, testInfo } = state;
    const showUpBy = 20;

    const rateByFirst = rateBy('firstRate', sortBy('firstRate', _.cloneDeep(info), showUpBy));
    const rateByWin = rateBy('winRate', sortBy('winRate', _.cloneDeep(info), showUpBy));

    useEffect(() => {
      const updateIdealInfo = async (url, type, info) => {
        info.forEach((e) => {
          e.firstTotal.enter++;
        });
        console.log(`${url}/${type}`, info);
        try {
          const req = await API.put(`/${type}`, info);
          console.log(req);
        } catch (e) {
          console.log(e);
        }
      }

      updateIdealInfo(idealType, testInfo);
    }, []);

    return (
      <>
        <ImageListItem>
            <ICard img={winner.url} value={`그룹 : ${winner.group} / 이름 : ${winner.name}`} />
            <ImageListItemBar title={`그룹 : ${winner.group} / 이름 : ${winner.name}`} />
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

export default memo(IdealResult);