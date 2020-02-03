import React, {useContext} from 'react';
import {Link as RouterLink} from "react-router-dom";
import {AuthContext} from "../context/authContext";
import {Box, Button, Typography, Link} from "@material-ui/core";
import {makeStyles, Theme, createStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) => (
    createStyles({
        root: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginTop: theme.spacing(30),
        },
    })))
const Home: React.FC = (props) => {
    const classes = useStyles()
    const context = useContext(AuthContext)
    return (
        <div className={classes.root}>
            <Typography variant='h6'>Home</Typography>
            <Box marginTop={2}>
                {!context.user && <Button>
                  <Link component={RouterLink} to='/login'>
                    login page
                  </Link>
                </Button>}
                <Button>
                    <Link component={RouterLink} to='/test'>
                        error page
                    </Link>
                </Button>
                <Button>
                    <Link component={RouterLink} to='/test123'>
                        wrong url
                    </Link>
                </Button>

                {context.user && <Button
                  color="primary" onClick={() => context.logout()}
                >
                  logout
                </Button>}
            </Box>
        </div>
    );
}

export default Home;