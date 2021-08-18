import React, { useState, memo } from 'react';
import { ThemeProvider } from 'styled-components';

import t_idealMale from 'img/ideal/idealThumbnail/t_idealMale.jpg';
import t_idealFemale from 'img/ideal/idealThumbnail/t_idealFemale.jpg';
import t_idealFood from 'img/ideal/idealThumbnail/t_idealFood.jpg';
import t_idealTour from 'img/ideal/idealThumbnail/t_idealTour.jpg';
import TournamentItemList from 'components/TournamentItemList';
import Dialog from 'components/Dialog';

const Games = [
  {
      id: 0,
      value: 'idealMale',
      img: t_idealMale,
  },
  {
      id: 1,
      value: 'idealFemale',
      img: t_idealFemale,
  },
  {
      id: 2,
      value: 'idealFood',
      img: t_idealFood,
  },
  {
      id: 3,
      value: 'idealTour',
      img: t_idealTour,
  },
];

const Round = [
  { id: 0, value: 128, label: '128', },
  { id: 1, value: 64, label: '64', },
  { id: 2, value: 32, label: '32', },
  { id: 3, value: 16, label: '16', },
];

// const AppBlock = styled.div`
//   width: 512px;
//   margin: 0 auto;
//   margin-top: 4rem;
//   border: 1px solid black;
//   padding: 1rem;
// `;

// const ButtonGroup = styled.div`
//   & + & {
//     margin-top: 1rem;
//   }
// `;

const Home = () => {
  const [game, setGame] = useState({
    id: Games[0].id,
    value: Games[0].value,
    img: Games[0].img,
  });
  const [round, setRound] = useState({
    id: Round[0].id,
    value: Round[0].value,
    label: Round[0].label,
  });
  const [dialog, setDialog] = useState(false);

  const handleSelectGame = (tile) => {
    setGame({
      id: tile.id,
      value: tile.value,
      img: tile.img,
    });
    setDialog(true);
  }

  const handleCancel = () => {
    setRound({ 
      id: Round[0].id,
      value: Round[0].value,
      label: Round[0].label,
    });
    setDialog(false);
  }

  const handleSelectRound = (e) => {
    setRound({
      id: e.id,
      value: e.value,
      label: e.label,
    });
  }

  const handleConfirm = () => {
    setDialog(false);
  }

  // const handleKeyPress = useCallback((e) => {
  //   console.log(e.key);
  //   if (e.key === 'Enter') {
  //     handleConfirm();
  //   } else if (e.key === 'Esc') {
  //     handleCancel();
  //   }
  // }, [handleCancel, handleConfirm]);

  return (

    <ThemeProvider
      theme={{
        palette: {
          blue: '#228be6',
          gray: '#495057',
          pink: '#f06595'
        }
      }}
    >
      <TournamentItemList onClick={handleSelectGame} itemData={Games} ></TournamentItemList>
      <Dialog
          title="정말로 삭제하시겠습니까?"
          confirmText="Play"
          cancelText="Cancel"
          onConfirm={handleConfirm}
          onCancel={handleCancel}
          onChange={handleSelectRound}
          visible={dialog}
          options={Round}
          img={game.img}
          gameValue={game.value}
          roundValue={round.value}
        >
      </Dialog>
    </ThemeProvider>
  );

}

export default memo(Home);