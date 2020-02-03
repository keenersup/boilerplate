import React from 'react'
import {ErrorProvider} from "./errorContext";
import {AuthProvider} from "./authContext";

interface Props {
    contexts: Array<React.JSXElementConstructor<React.PropsWithChildren<any>>>
    children: React.ReactNode
}

function Provider(props: Props) {
    const {contexts = [], children} = props

    return (
        <>
            {contexts.reduceRight((acc, Context) => {
                return <Context>{acc}</Context>
            }, children)}
        </>
    )
}

const ContextProvider: React.FC = (props) => {
    return (
        <Provider
            contexts={[ErrorProvider, AuthProvider]}
            children={props.children}
            {...props}
        />
    )
}

export default ContextProvider
