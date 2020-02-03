import React, {createContext, useReducer} from 'react'
import jwtDecode from 'jwt-decode'
import gql from 'graphql-tag'
import {useApolloClient, useMutation} from '@apollo/react-hooks'
import {useGenerateFingerprint} from "../hooks/useGenerateFingerprint";
import {useHistory} from 'react-router-dom'
import {UserData, IAuthState, authReducer} from "./reducer/authReducer";
import {Omit} from "../types/util";

interface IAuthContext extends IAuthState {
    login: (user: UserData) => void
    logout: () => void
}


interface TokenData extends Omit<UserData, 'accessToken'> {
    clientId: string
    exp: number
}


//todo: TokenData UserData type check and initialState.user check

/********* ********* ********* ********* ********* ********* ********* ********* *********
 todo: token store at localStorage vs sessionStorage with at login page "keep login" checkbox button
 ********* ********* ********* ********* ********* ********* ********* ********* *********/
const initialState: IAuthState = {
    user: null,
    clientId: null,
}

/********* ********* ********* ********* ********* ********* ********* ********* *********
 when error all state reset
 todo: logout resolver should includes here
 ********* ********* ********* ********* ********* ********* ********* ********* *********/
const resetValues = () => {
    try {
        initialState.user = null;
        initialState.clientId = null
        localStorage.removeItem('clientId')
        localStorage.removeItem('token')
    } catch (err) {
        console.log(err);
    }
};

const AuthContext = createContext<IAuthContext>({
    user: null,
    clientId: null,
    login: () => {
    },
    logout: () => {
    },
})

const AuthProvider: React.FC = (props) => {
    const clientToken = localStorage.getItem('clientId')
    const accessToken = localStorage.getItem('token')
    const {clientId} = useGenerateFingerprint({clientToken, resetValues})
    const history = useHistory()
    const client = useApolloClient()
    const [logoutMutation] = useMutation(LOGOUT_MUTATION)

    const refreshToken = () => {
        client.mutate({
            mutation: REFRESHTOKEN_MUTATION,
            variables: {
                accessToken: accessToken,
                clientId: initialState.clientId,
            },
        }).then(({data: {refreshToken: {accessToken}}}) => {
            const decodedUser: TokenData = jwtDecode(accessToken)
            initialState.user = {
                id: decodedUser.id,
                email: decodedUser.email,
                username: decodedUser.username,
                accessToken: accessToken,
                roles: decodedUser.roles
            }
            initialState.clientId = decodedUser.clientId
            localStorage.setItem('token', accessToken)
            localStorage.setItem('clientId', decodedUser.clientId)
        }).catch(err => {
            console.log(err);
            resetValues()
        })
    }
    /********* ********* ********* ********* ********* ********* ********* ********* *********
     jwt token expired 체크 && refresh token
     ********* ********* ********* ********* ********* ********* ********* ********* *********/
    if (accessToken && clientToken) {
        try {
            const decodedUser: TokenData = jwtDecode(accessToken)
            initialState.user = {
                id: decodedUser.id,
                email: decodedUser.email,
                username: decodedUser.username,
                accessToken: accessToken,
                roles: decodedUser.roles
            }
            initialState.clientId = clientToken

            if (decodedUser.exp * 1000 < Date.now()) {
                refreshToken()
            }
        } catch (err) {
            console.log(err);
            resetValues()
            // window.location.reload()
        }
    } else {
        resetValues()
    }

    const [state, dispatch] = useReducer(authReducer, initialState)
    const login = (userData: UserData) => {
        localStorage.setItem('token', userData.accessToken!)
        localStorage.setItem('clientId', clientId)
        dispatch({
            type: 'login',
            user: userData,
            clientId: clientId,
        })
    }
    const logout = async () => {
        try {
            await logoutMutation()
            localStorage.removeItem('token')
            localStorage.removeItem('clientId')
            history.push('/')
            dispatch({
                type: 'logout',
                user: null,
                clientId: null,
            })
        } catch (e) {
            console.error(e)
            resetValues()
        }
    }
    const user = state.user
    return (
        <AuthContext.Provider
            value={{
                login, logout, user, clientId,
            }}
            {...props}
        />
    );
}

const REFRESHTOKEN_MUTATION = gql`
    mutation refreshToken(
        $accessToken: String!
        $clientId: String!
    ){
        refreshToken(
            accessToken:$accessToken
            clientId: $clientId
        ) {
            accessToken
        }
    }
`

const LOGOUT_MUTATION = gql`
    mutation logout{
        logout
    }
`

export {AuthContext, AuthProvider}

