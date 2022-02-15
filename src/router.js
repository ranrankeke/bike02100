import React from 'react'
import { HashRouter, Route, Switch } from 'react-router-dom'
import App from './App'
import Login from './pages/login/index'
import Admin from './admin'
import Buttons from './pages/ui/buttons'
import NoMacth from './pages/nomatch'
import Modals from './pages/ui/modals'
export default class Router extends React.Component {
    render() {
        return (
            <HashRouter>
                <App>

                    <Route path="/login" component={Login} />
                    <Route path="/admin" render={() =>
                        <Switch>
                            <Admin>
                                <Route path="/admin/ui/buttons" component={Buttons} />
                                <Route path="/admin/ui/modals" component={Modals} />
                                <Route component={NoMacth} />
                            </Admin>
                        </Switch>
                    } />
                    <Route patch="/order/detail" component={Login} />

                </App>
            </HashRouter>
        )
    }
}