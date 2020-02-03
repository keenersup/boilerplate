import React, {useContext} from 'react';
import {ErrorContext} from "../../context/errorContext";
import NotFoundPage from "./NotFoundPage";


export type ErrorBoundaryWrapperProps = {
    children: React.ReactNode
}

const ErrorBoundaryWrapper = ({ children}: ErrorBoundaryWrapperProps) => {
    const context = useContext(ErrorContext)
    if (context.isNotFound) {
        return <NotFoundPage />
    }

    return (
        <>{children}</>
    );
}

export default ErrorBoundaryWrapper;