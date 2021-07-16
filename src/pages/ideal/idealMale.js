import React, { memo } from 'react';
import IdealGames from 'components/IdealGames';
import testMaleJson from 'shared/testMaleJson';

const idealMale = (props) => {
    const { match } = props;
    return (
        <IdealGames match={match} data={testMaleJson}/>
    );
};

export default memo(idealMale);