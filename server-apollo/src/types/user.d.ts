import {Roles} from "./enum";

export interface UserToken {
    id: string
    username: string
    email: string
    refreshToken?: string
    roles: Roles
    clientId: string
}
