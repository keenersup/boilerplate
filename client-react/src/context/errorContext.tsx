import React, {createContext, useReducer} from 'react';
import {errorReducer, IErrorState} from "./reducer/errorReducer";

interface IErrorContext {
    showNotFound: () => void
    reset: () => void
    isNotFound: null | boolean
}

const initialState: IErrorState = {error: null}

const ErrorContext = createContext<IErrorContext>({
    showNotFound: () => {
    },
    reset: () => {
    },
    isNotFound: null
})
const ErrorProvider: React.FC = (props) => {
    const [state, dispatch] = useReducer(errorReducer, initialState)
    const showNotFound = () => {
        dispatch({
            type: 'showNotFound',
            hasError: true
        })
    }
    const reset = () => {
        dispatch({
            type: 'reset',
        })
    }
    const isNotFound = state.error

    return (
        <ErrorContext.Provider
            value={{
                showNotFound, reset, isNotFound,
            }}
            {...props}
        />
    );
}

export {ErrorProvider, ErrorContext}
