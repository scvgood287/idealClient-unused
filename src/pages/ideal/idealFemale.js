import React, { memo } from 'react';
import IdealGames from 'components/IdealGames';

const idealType = 'idealFemale';

const idealFemale = ({ match }) => {
    return (
        <IdealGames match={match} type={idealType} />
    );
};

export default memo(idealFemale);