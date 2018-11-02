import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Home from '../views/Home';
import Configurator from '../views/Configurator';
import ErrorPage from '../views/Error';

const Routes = () => {
    return (
        <main>
            <Switch>
                <Route component={Home} exact path="/" />
                <Route component={Configurator} path="/configurator" />
                <Route component={ErrorPage} />
            </Switch>
        </main>
    );
};

Routes.propTypes = {};

export default Routes;
