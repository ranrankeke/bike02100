import React from 'react'
import { HashRouter, Route, Switch } from 'react-router-dom'
import App from './App'
import Login from './pages/login/index'
import Admin from './admin'
import Buttons from './pages/ui/buttons'
import NoMacth from './pages/nomatch'
import Modals from './pages/ui/modals'
import Loading from './pages/ui/loading'
import Notice from './pages/ui/notice'
import Messages from './pages/ui/messages'
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
                                <Route path="/admin/ui/loading" component={Loading} />
                                <Route path="/admin/ui/notification" component={Notice} />
                                <Route path="/admin/ui/messages" component={Messages} />
                                <Route component={NoMacth} />
                            </Admin>å
                        </Switch>
                    } />
                    <Route patch="/order/detail" component={Login} />

                </App>
            </HashRouter>
        )
    }
}