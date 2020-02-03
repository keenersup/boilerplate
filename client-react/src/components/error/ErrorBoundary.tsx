import * as React from 'react';
import ErrorBoundaryWrapper from "./ErrorBoundaryWrapper";
import WarningPage from "./WarningPage";

class ErrorBoundary extends React.Component {
    state = {
        hasError: false
    }

    static getDerivedStateFromError(error: Error) {
        return {
            hasError: true
        }
    }

    componentDidCatch(error: Error, errorInfo: any) {
        console.log({
            error,
            errorInfo,
            stringifiedError: JSON.stringify(error || {}),
        })
    }


    render() {
        if (this.state.hasError) {
            return <WarningPage />
        }
        return <ErrorBoundaryWrapper>
            {this.props.children}
        </ErrorBoundaryWrapper>;
    }
}

export default ErrorBoundary