import React from 'react'
import { HashRouter as Router, Route, Link, HashRouter } from 'react-router-dom'
import Main from './main'
import About from './about'
export default class Home extends React.Component {
    render() {
        return (
            <HashRouter>
                <div>
                    <ul>
                        <li><Link to="/">Main</Link></li>
                        <li><Link to="/about">About</Link></li>
                    </ul>
                    <hr />
                    <Route path="/" exact component={Main} />
                    <Route path="/about" component={About} />
                </div>
            </HashRouter>
        );
    }
}