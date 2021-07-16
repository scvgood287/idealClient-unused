import React, { memo } from 'react';
import IdealGames from 'components/IdealGames';
import testFemaleJson from 'shared/testFemaleJson';

const idealFemale = (props) => {
    const { match } = props;
    return (
        <IdealGames match={match} data={testFemaleJson}/>
    );
};

export default memo(idealFemale);