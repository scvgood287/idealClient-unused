import React, { memo, useState, useEffect } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { makeStyles, ImageList, ImageListItem, ImageListItemBar } from '@material-ui/core';
import { Link } from 'react-router-dom';

import Button from './Button';
import SingleSelect from './SingleSelect';

const fadeIn = keyframes`
  from {
    opacity: 0
  }
  to {
    opacity: 1
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1
  }
  to {
    opacity: 0
  }
`;

const slideUp = keyframes`
  from {
    transform: translateY(200px);
  }
  to {
    transform: translateY(0px);
  }
`;

const slideDown = keyframes`
  from {
    transform: translateY(0px);
  }
  to {
    transform: translateY(200px);
  }
`;

const DarkBackground = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.8);

  animation-duration: 0.25s;
  animation-timing-function: ease-out;
  animation-name: ${fadeIn};
  animation-fill-mode: forwards;

  ${props =>
    props.disappear &&
    css`
      animation-name: ${fadeOut};
    `}
`;

const DialogBlock = styled.div`
  width: 320px;
  padding: 1.5rem;
  background: white;
  border-radius: 2px;
  h3 {
    margin: 0;
    font-size: 1.5rem;
  }
  p {
    font-size: 1.125rem;
  }

  animation-duration: 0.25s;
  animation-timing-function: ease-out;
  animation-name: ${slideUp};
  animation-fill-mode: forwards;

  ${props =>
    props.disappear &&
    css`
      animation-name: ${slideDown};
    `}
`;

const ButtonGroup = styled.div`
  margin-top: 3rem;
  display: flex;
  justify-content: flex-end;
`;

const ShortMarginButton = styled(Button)`
  a > & {
    margin-left: 0.5rem;
  }
`;

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
    width: 500,
    height: 450,
  },
}));

const Dialog = (props) => {
  const {
    img,
    gameValue,
    roundValue,
    confirmText,
    cancelText,
    onConfirm,
    options,
    onCancel,
    onChange,
    visible,
  } = props;
  const [animate, setAnimate] = useState(false);
  const [localVisible, setLocalVisible] = useState(visible);
  const classes = useStyles();

  useEffect(() => {
    if (localVisible && !visible) {
      setAnimate(true);
      setTimeout(() => setAnimate(false), 250);
    }
    setLocalVisible(visible);
  }, [localVisible, visible]);
  
  if (!animate && !localVisible) return null;
  return (
    <DarkBackground disappear={!visible}>
      <DialogBlock disappear={!visible}>
      <div className={classes.root}>
        <ImageList rowHeight={180} className={classes.imageList}>
          <ImageListItem>
            <img src={img} alt={gameValue} />
            <ImageListItemBar title={gameValue} />
          </ImageListItem>
        </ImageList>
      </div>
        <SingleSelect options={options} onChange={onChange}></SingleSelect>
        <ButtonGroup>
          <ShortMarginButton color="gray" onClick={onCancel}>
            {cancelText}
          </ShortMarginButton>
          <Link style={linkStyle} onClick={() => onConfirm()}
            to={{
              pathname: `${gameValue}/${roundValue}`,
            }}>
            <ShortMarginButton color="pink" >
              {confirmText}
            </ShortMarginButton>
          </Link>
        </ButtonGroup>
      </DialogBlock>
    </DarkBackground>
  );
}

Dialog.defaultProps = {
  confirmText: '??????',
  cancelText: '??????'
};

export default memo(Dialog);