import React from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import {Container, Grid, Paper, Box} from '@material-ui/core';
import EmptyGrid from '../components/admin/EmptyGrid';
import clsx from "clsx";
import Copyright from '../components/Copyright';
import AllUserTable from '../components/admin/AllUserTable';

const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        display: 'flex',
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    content: {
        flexGrow: 1,
        overflow: 'auto',
    },
    paper: {
        display: 'flex',
        flexDirection: 'column',
        overflow: 'auto',
        padding: theme.spacing(2),
        paddingBottom: 0,
    },
    fixedHeight: {
        height: 240
    },
}))


const Admin = () => {
    const classes = useStyles()
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight)
    return (
        <div className={classes.root}>
            <main className={classes.content}>
                <Container maxWidth="xl" className={classes.container}>
                    <Grid container spacing={5}>
                        <Grid item xs={12} md={8} lg={9}>
                            <Paper className={fixedHeightPaper}>
                                <EmptyGrid />
                            </Paper>
                        </Grid>

                        <Grid item xs={12} md={4} lg={3}>
                            <Paper className={fixedHeightPaper}>
                                <EmptyGrid />
                            </Paper>
                        </Grid>

                        <Grid item xs={12}>
                            <AllUserTable rowsPerPage={5} />
                        </Grid>
                    </Grid>
                    <Box pt={4}>
                        <Copyright />
                    </Box>
                </Container>
            </main>
        </div>
    );
}

export default Admin;