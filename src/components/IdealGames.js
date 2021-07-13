import React, { memo, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles, GridList, GridListTile, GridListTileBar } from '@material-ui/core';

import ICard from './ICard';

// Set Maximum Round
const maxRoundValue = 16;

// Make Tournament Draw
const setMatches = (v) => Array.from({length: v}, (_,i) => i);
const shuffle = (arr) => {
    for (let i = arr.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}
const createMatches = (arr) => {
    const temp = [];

    for (let i = 0; i < arr.length; i += 2) {
        temp.push(arr.slice(i, i + 2));
    }

    return temp;
}
let matches = createMatches(shuffle(setMatches(maxRoundValue)));

// styles
const linkStyle = {
    textDecoration: 'none',
}
const useStyles = makeStyles((theme) => ({
    gridRoot: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    gridList: {
        display: 'grid',
        gridTemplateColumns: 'repeat(2, minmax(50%, 50%))',
        gridTemplateRows: 'repeat(2, minmax(50%, 50%))',
        width: 500,
        height: 450,
    },
    gridListTile: {
    },
    icon: {
      color: 'rgba(255, 255, 255, 0.54)',
    },
  }));

// Import all Images
const importAll = (r) => {
    let images = {};
    r.keys().map((e, i) => {
        let splitName = e.replace('.jpg', '').replace('./', '').split('_');
        let splitNameLength = splitName.length;

        images[i] = r(e);
        images[i].group = splitName[splitNameLength - 2];
        images[i].name = splitName[splitNameLength - 1].replace('-', ' ');
        images[i].value = `${images[i].group} ${images[i].name}`;
    });
    return images;
}

const IdealGames = ( props ) => {
    const { match, type } = props;

    const [roundValue, setRoundValue] = useState(match.params.value);
    const [winner, setWinner] = useState([]);
    const [draw, setDraw] = useState(matches.slice(0, roundValue/2));
    const [index, setIndex] = useState(0);

    const images = importAll(
        type === 'idealFemale' ?
        require.context('img/ideal/female', false, /\.jpg/) :
        type === 'idealMale' ?
        require.context('img/ideal/male', false, /\.jpg/) :
        type === 'idealFood' ?
        require.context('img/ideal/food', false, /\.jpg/) :
        type === 'idealTour' ?
        require.context('img/ideal/tour', false, /\.jpg/) : null
    );
    const gameValue = useMemo(() => (match.url.replaceAll(roundValue, '').replaceAll('/', '')), []);
    const classes = useStyles();

    const handleIsWinner = (e) => {
        if (index < (roundValue/2)) {
            setWinner(winner.concat(e));
            setIndex(index+1);
            console.log("The Winner Is : " + e);
        } else if (index > (roundValue/2)) {
            console.log("Error : index > (roundValue/2)");
        }
    }

    if (index >= (roundValue/2)) {
        setRoundValue(roundValue/2);
        setDraw(createMatches(winner.slice(0, roundValue/2)));
        setWinner([]);
        setIndex(0);
    }

    const matchUp = () => {
        if (index < (roundValue/2)) {
            return (
                <>
                    <GridListTile className={classes.gridListTile} key={draw[index][0]} onClick={() => handleIsWinner(draw[index][0])}>
                        <ICard img={images[draw[index][0]].default} value={images[draw[index][0]].value} />
                        <GridListTileBar title={images[draw[index][0]].value} />
                    </GridListTile>
                    <GridListTile className={classes.gridListTile} key={draw[index][1]} onClick={() => handleIsWinner(draw[index][1])}>
                        <ICard img={images[draw[index][1]].default} value={images[draw[index][1]].value} />
                        <GridListTileBar title={images[draw[index][1]].value} />
                    </GridListTile>
                </>
            )
        } else if (index === (roundValue/2)) {
            return (
                <>
                    <GridListTile className={classes.gridListTile} key={draw[index-1][0]} onClick={() => handleIsWinner(draw[index-1][0])}>
                        <ICard img={images[draw[index-1][0]].default} value={images[draw[index-1][0]].value} />
                        <GridListTileBar title={images[draw[index-1][0]].value} />
                    </GridListTile>
                    <GridListTile className={classes.gridListTile} key={draw[index-1][1]} onClick={() => handleIsWinner(draw[index-1][1])}>
                        <ICard img={images[draw[index-1][1]].default} value={images[draw[index-1][1]].value} />
                        <GridListTileBar title={images[draw[index-1][1]].value} />
                    </GridListTile>
                </>
            )
        } else console.log("Error : index > (roundValue/2)");
    }

    // Test
    (function (){
        console.log(matchUp());
    })();

    return (
        <div>
            <h1>{gameValue}</h1>
            <h2>{(roundValue === 2) ? "결승전" : roundValue}</h2>

            <div className={classes.gridRoot}>
                <GridList cellHeight={180} className={classes.gridList}>
                    {(roundValue === 2) ?
                        matchUp().props.children.map((e) => (
                            <>
                                <Link key={e.key} to={`/result`} style={linkStyle}>
                                    {e}
                                </Link>
                            </>
                        ))
                        : matchUp()
                    }  
                </GridList>
            </div>
        </div>
    );

}

export default memo(IdealGames);