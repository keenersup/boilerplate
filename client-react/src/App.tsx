import React, {lazy, Suspense} from 'react';
import {CssBaseline} from '@material-ui/core'
import {createMuiTheme, ThemeProvider} from '@material-ui/core/styles'
import {BrowserRouter, Switch} from "react-router-dom";
import {Route, PublicRoute, AdminRoute} from "./components/AuthenticationRoute";
import Fallback from "./components/Fallback";
import ErrorBoundary from "./components/error/ErrorBoundary";
import {koKR} from '@material-ui/core/locale';

import NavBar from "./components/layout/NavBar";
import ContextProvider from "./context";

const AdminNavBar = lazy(() => import('./components/layout/AdminNavBar'))
const Admin = lazy(() => import('./pages/Admin'))
const MembershipTable = lazy(() => import('./pages/MembershipTable'))

const Home = lazy(() => import('./pages/Home'))
const Login = lazy(() => import('./pages/Login'))
const Register = lazy(() => import('./pages/Register'))

const TestPage = lazy(() => import('./pages/TestPage'))
const AdminTest = lazy(() => import('./pages/AdminTest'))

const NotFound = lazy(() => import('./pages/NotFound'))

const App: React.FC = () => {
    const theme = createMuiTheme(koKR)
    return (
        /*
                todo: fallback loading page
        */
        <ThemeProvider theme={theme}>
            <Suspense fallback={<Fallback />}>
                <CssBaseline />
                <BrowserRouter>
                    <ContextProvider>
                        <ErrorBoundary>
                            <Switch>
                                <Route path='/' exact layout={NavBar} component={Home} />
                                <PublicRoute path='/login' exact component={Login} />
                                <PublicRoute path='/register' exact component={Register} />

                                <AdminRoute path='/admin' exact layout={AdminNavBar} component={Admin} />
                                <AdminRoute path='/admin/membership_management' exact layout={AdminNavBar}
                                            component={MembershipTable} />
                                <AdminRoute path='/admin/admin_test' exact layout={AdminNavBar} component={AdminTest} />

                                <Route path='/test' exact layout={NavBar} component={TestPage} />

                                <Route component={NotFound} />
                            </Switch>
                        </ErrorBoundary>
                    </ContextProvider>
                </BrowserRouter>
            </Suspense>
        </ThemeProvider>
    );
}

export default App;
