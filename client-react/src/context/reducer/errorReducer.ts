export interface IErrorState {
    error: boolean | null
}

export type IErrorAction =
    | { type: 'showNotFound', hasError: boolean }
    | { type: 'reset' }

export const errorReducer = (state: IErrorState, action: IErrorAction): IErrorState => {
    switch (action.type) {
        case 'showNotFound':
            return {
                ...state,
                error: action.hasError
            }
        case 'reset':
            return {
                ...state,
                error: null,
            }
        default:
            return state
    }
}