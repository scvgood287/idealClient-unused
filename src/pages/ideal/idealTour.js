import React, { memo } from 'react';
import IdealGames from 'components/IdealGames';

const idealType = 'idealTour';

const idealTour = ({ match }) => {
    return (
        <IdealGames match={match} type={idealType}/>
    );
};

export default memo(idealTour);