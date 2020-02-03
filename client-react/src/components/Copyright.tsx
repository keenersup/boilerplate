import React from 'react';
import {Link, Typography} from "@material-ui/core";
import AdapterLink from "./AdapterLink";
import {TITLE} from "../config";


export type ICopyrightProps = {}
const Copyright = (props: ICopyrightProps) => {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" to="/" component={AdapterLink}>
                {TITLE}
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

export default Copyright;