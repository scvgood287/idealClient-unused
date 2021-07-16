import React, { memo } from 'react';
import Card from '@material-ui/core/Card';
import { makeStyles, CardActionArea } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
});

const ICard = (props) => {
  const { img, value } = props;

  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <img src={img} alt={value}></img>
      </CardActionArea>
    </Card>
  );
}

export default memo(ICard);