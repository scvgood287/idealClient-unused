import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Home, idealMale, idealFemale, idealFood, idealTour, NotFound } from 'pages';

const App = () => {
    return (
        <div>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/idealMale/:value" component={idealMale} />
                <Route path="/idealFemale/:value" component={idealFemale} />
                <Route path="/idealFood/:value" component={idealFood} />
                <Route path="/idealTour/:value" component={idealTour} />
                <Route component={NotFound} />
            </Switch>
        </div>
    );
}

export default App;