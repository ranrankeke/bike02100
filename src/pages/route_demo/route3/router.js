import React, { Component } from 'react'
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Main from './main'
import About from '../route1/about'
import Topics from '../route1/topics'
import Home from './Home'
import Info from './info'
import NoMatch from './NoMath'
export default class IRoute extends Component {
    render() {
        return (
            <Router>
                <Home>
                    <Switch>
                        <Route path="/main" render={() =>
                            <Main>
                                <Route path="/main/:value" component={Info}></Route>
                            </Main>
                        }></Route>
                        <Route path="/about" component={About}></Route>
                        <Route path="/topics" component={Topics}></Route>
                        <Route component={NoMatch}></Route>
                    </Switch>
                </Home>
            </Router>
        );
    }

}
