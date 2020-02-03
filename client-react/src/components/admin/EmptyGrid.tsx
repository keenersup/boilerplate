import React from 'react';
import {createStyles, makeStyles, Theme} from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => (
        createStyles({
            root: {
                height: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            },
        })
    )
)

export type IEmptyGridProps = {}
const EmptyGrid = (props: IEmptyGridProps) => {
    const classes = useStyles()
    return (
        <div className={classes.root}>
            empty box
        </div>
    );
}

export default EmptyGrid;