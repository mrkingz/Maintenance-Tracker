import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { 
    IndexPage,
} from '../components/pages'
const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/:page?" component={ IndexPage } />
            </Switch>
        </BrowserRouter>
    );
}

export default Routes

