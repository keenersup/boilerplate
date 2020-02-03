import {Roles} from "../../types/enum";

export interface UserData {
    id: string
    email: string
    username: string
    accessToken: string
    roles: Roles
}
export interface IAuthState {
    user: null | UserData
    clientId: null | string
}

export type IAuthAction =
    | { type: 'login', user: UserData, clientId: string }
    | { type: 'logout', user: null, clientId: null }
export const authReducer = (state: IAuthState, action: IAuthAction): IAuthState => {
    switch (action.type) {
        case 'login':
            return {
                ...state,
                user: action.user,
                clientId: action.clientId,
            }
        case 'logout':
            return {
                ...state,
                user: null,
                clientId: null,
            }
        default:
            return state
    }
}
