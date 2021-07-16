import React, { memo } from 'react';
import { makeStyles, ImageList, ImageListItem, ImageListItemBar, ListSubheader  } from '@material-ui/core';

import ICard from './ICard';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  imageList: {
    width: 500,
    height: 450,
  },
}));

const TournamentItemList = (props) => {
  const { onClick, itemData } = props;

  const classes = useStyles();

  const items = itemData.map((item) => (
    <ImageListItem key={item.img} onClick={() => onClick(item)}>
      <ICard img={item.img} value={item.value} ></ICard>
      <ImageListItemBar
        title={item.value}
      />
    </ImageListItem>
  ))

  return (
    <div className={classes.root}>
      <ImageList rowHeight={180} className={classes.imageList}>
        <ImageListItem key="Subheader" cols={2} style={{ height: 'auto' }}>
          <ListSubheader component="div">이상형 월드컵 모음</ListSubheader>
        </ImageListItem>
        {items}
      </ImageList>
    </div>
  );
}

export default memo(TournamentItemList);
