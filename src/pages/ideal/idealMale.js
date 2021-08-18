import React, { memo} from 'react';
import IdealGames from 'components/IdealGames';
import mockJson from 'shared/mockJson';

const idealType = 'idealMale';
const infoDataIndex = mockJson.findIndex(e => e.subject === idealType);
const infoData = mockJson[infoDataIndex].info;

const IdealMale = (props) => {
    const { match } = props;
    
    return (
        <IdealGames match={match} info={infoData} idealType={idealType}/>
    );
};

export default memo(IdealMale);