import React, {useContext} from 'react';
import {useHistory} from "react-router-dom";
import ErrorScreenTemplate from "./ErrorScreenTemplate";
import {undrawWarning} from "../../static/images";
import {ErrorContext} from "../../context/errorContext";


export type WarningPageProps = {}
const WarningPage = (props: WarningPageProps) => {
    const history = useHistory()
    const context = useContext(ErrorContext)
    return (
        <ErrorScreenTemplate
            image={undrawWarning}
            message="긴급 보수중!"
            buttonText="홈으로"
            onButtonClick={() => {
                history.push('/')
                context.reset()
            }}
        />
    );
}

export default WarningPage;