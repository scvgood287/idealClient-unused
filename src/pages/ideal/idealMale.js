import React, { memo } from 'react';
import IdealGames from 'components/IdealGames';

const idealType = 'idealMale';

const idealMale = ({ match }) => {
    return (
        <IdealGames match={match} type={idealType}/>
    );
};

export default memo(idealMale);