import React, { memo } from 'react';
import IdealGames from 'components/IdealGames';
import testFoodJson from 'shared/testFoodJson';

const idealFood = (props) => {
    const { match } = props;
    return (
        <IdealGames match={match} data={testFoodJson}/>
    );
};

export default memo(idealFood);