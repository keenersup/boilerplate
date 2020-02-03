import React from 'react';
import {createStyles, makeStyles, Theme} from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => (
        createStyles({
            root: {
                display: 'flex',
                width: '100%',
                height: '100%',
                alignItems: 'center',
                justifyContent: 'center',
            },
        })
    )
)

export type CrashErrorScreenProps = {}
const CrashErrorScreen = (props: CrashErrorScreenProps) => {
    const classes = useStyles()
    return (
        <div>

        </div>
    );
}

export default CrashErrorScreen;
