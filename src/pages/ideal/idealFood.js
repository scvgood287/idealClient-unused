import React, { memo } from 'react';
import IdealGames from 'components/IdealGames';

const idealType = 'idealFood';

const idealFood = ({ match }) => {
    return (
        <IdealGames match={match} type={idealType}/>
    );
};

export default memo(idealFood);