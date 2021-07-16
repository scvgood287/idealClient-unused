import React, { memo } from 'react';
import IdealGames from 'components/IdealGames';
import testTourJson from 'shared/testTourJson';

const idealTour = (props) => {
    const { match } = props;
    return (
        <IdealGames match={match} data={testTourJson}/>
    );
};

export default memo(idealTour);