import React, {useContext} from 'react';
import {useHistory} from "react-router-dom";
import ErrorScreenTemplate from "./ErrorScreenTemplate";
import {undrawPageNotFound} from "../../static/images";
import {ErrorContext} from "../../context/errorContext";


export type NotFoundPageProps = {}
const NotFoundPage = (props: NotFoundPageProps) => {
    const history = useHistory()
    const context = useContext(ErrorContext)
    return (
        <ErrorScreenTemplate
            image={undrawPageNotFound}
            message="아무것도 없네요!"
            buttonText="홈으로"
            onButtonClick={() => {
                history.push('/')
                context.reset()
            }}
        />
    );
}

export default NotFoundPage;