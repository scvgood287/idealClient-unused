import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Home, idealMale, idealFemale, idealFood, idealTour, idealResult, NotFound } from 'pages';

const App = () => {
    return (
        <div>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/idealMale/:value" component={idealMale} />
                <Route exact path="/idealFemale/:value" component={idealFemale} />
                <Route exact path="/idealFood/:value" component={idealFood} />
                <Route exact path="/idealTour/:value" component={idealTour} />
                <Route exact path="/result" component={idealResult} />
                <Route component={NotFound} />
            </Switch>
        </div>
    );
}

export default App;