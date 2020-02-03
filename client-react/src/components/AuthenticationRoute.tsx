import React, {useContext} from 'react'
import {Redirect, Route as ReactRoute, RouteComponentProps} from 'react-router-dom'
import {AuthContext} from "../context/authContext";
import {Roles} from "../types/enum";

interface Props {
    exact?: boolean
    path?: string
    component: React.FC<RouteComponentProps>
    layout?: React.FC
}

export const Route = ({component: Component, layout: Layout, ...rest}: Props) => {
    return (
        <ReactRoute
            {...rest}
            render={(props: RouteComponentProps) => {
                return (
                    <>
                        {Layout && <Layout />}
                        <Component{...props} />
                    </>
                )
            }}
        />
    )
}

export const PublicRoute = ({component: Component, layout: Layout, ...rest}: Props) => {
    const context = useContext(AuthContext)
    return (
        <ReactRoute
            {...rest}
            render={(props: RouteComponentProps) => {
                return context.user ? <Redirect to='/' /> :
                    <>
                        {Layout && <Layout />}
                        <Component{...props} />
                    </>
            }}
        />
    );
}
export const PrivateRoute = ({component: Component, layout: Layout, ...rest}: Props) => {
    const context = useContext(AuthContext)
    return (
        <ReactRoute
            {...rest}
            render={(props: RouteComponentProps) => {
                return context.user ?
                    <>
                        {Layout && <Layout />}
                        <Component{...props} />
                    </>
                    :
                    <Redirect to='/login' />
            }}
        />
    );
}
export const AdminRoute = ({component: Component, layout: Layout, ...rest}: Props) => {
    const context = useContext(AuthContext)
    return (
        <ReactRoute
            {...rest}
            render={(props: RouteComponentProps) => {
                return context.user?.roles === Roles.admin ?
                    <>
                        {Layout
                            ? <Layout>
                                <Component{...props} />
                            </Layout>
                            : <Component{...props} />
                        }
                    </>
                    :
                    <Redirect to='/login' />
            }}
        />
    );
}
