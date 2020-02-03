import React from 'react';
import {createStyles, makeStyles, Theme, Typography, Button} from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => (
        createStyles({
            root: {
                display: 'flex',
                width: '100%',
                height: '100%',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                '& img': {
                    width: '20rem',
                    height: 'auto',
                    [theme.breakpoints.down('xs')]: {
                        width: '12rem',
                    }
                }
            },
        })
    )
)

export type ErrorScreenTemplateProps = {
    image: string
    message: string
    buttonText?: string
    onButtonClick?: () => void
}
const ErrorScreenTemplate = ({image, message, buttonText, onButtonClick}: ErrorScreenTemplateProps) => {
    const classes = useStyles()
    return (
        <div className={classes.root}>
            <img src={image} alt='error' />
            <Typography>{message}</Typography>
            {buttonText &&
            <Button
              onClick={onButtonClick}
            >
                {buttonText}
            </Button>
            }
        </div>
    );
}

export default ErrorScreenTemplate;