import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Home, IdealMale, IdealFemale, IdealFood, IdealTour, IdealResult, NotFound } from 'pages';

const App = () => {
    return (
        <div>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/idealMale/:value" component={IdealMale} />
                <Route exact path="/idealFemale/:value" component={IdealFemale} />
                <Route exact path="/idealFood/:value" component={IdealFood} />
                <Route exact path="/idealTour/:value" component={IdealTour} />
                <Route exact path="/result" component={IdealResult} />
                <Route component={NotFound} />
            </Switch>
        </div>
    );
}

export default App;