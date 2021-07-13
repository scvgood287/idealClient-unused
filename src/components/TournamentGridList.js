import React, { memo } from 'react';
import { makeStyles, GridList, GridListTile, GridListTileBar, ListSubheader  } from '@material-ui/core';

import ICard from './ICard';

const useStyles = makeStyles((theme) => ({
  gridRoot: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 500,
    height: 450,
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
}));

const TournamentGridList = (props) => {
  const { onClick, tileData } = props;

  const classes = useStyles();

  const tiles = tileData.map((tile) => (
    <GridListTile key={tile.img} onClick={() => onClick(tile)}>
      <ICard img={tile.img} value={tile.value} ></ICard>
      <GridListTileBar
        title={tile.value}
      />
    </GridListTile>
  ))

  return (
    <div className={classes.gridRoot}>
      <GridList cellHeight={180} className={classes.gridList}>
        <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
          <ListSubheader component="div">이상형 월드컵 모음</ListSubheader>
        </GridListTile>
        {tiles}
      </GridList>
    </div>
  );
}

export default memo(TournamentGridList);
