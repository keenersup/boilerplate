import React from 'react';
import {Link, Toolbar, Typography, AppBar, IconButton} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import {makeStyles, Theme, createStyles} from '@material-ui/core/styles';
import AdapterLink from "../AdapterLink";
import UserMenu from "./userMenu/UserMenu";
import AdminSideBar from "./AdminSideBar";


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            [theme.breakpoints.down('md')]: {
                display: 'block',
            },
            height: '100%',
        },
        grow: {
            flexGrow: 1,
        },
        appBar: {
            zIndex: theme.zIndex.drawer + 1,
        },
        menuButton: {
            marginRight: theme.spacing(2),
            [theme.breakpoints.up('lg')]: {
                display: 'none',
            },
        },
        toolbar: theme.mixins.toolbar,
        content: {
            flexGrow: 1,
            padding: theme.spacing(3),
        },
    }),
);

interface IAdminNavBarProps {
}

const AdminNavBar: React.FC<IAdminNavBarProps> = (props) => {
    const drawerWidth = 240;
    const classes = useStyles({drawerWidth});

    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };


    return (
        <div className={classes.root}>
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        className={classes.menuButton}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap>
                        <Link color="inherit" underline="none" to="/admin" component={AdapterLink}>
                            Admin
                        </Link>
                    </Typography>
                    <div className={classes.grow} />
                    <UserMenu />
                </Toolbar>
            </AppBar>
            <AdminSideBar drawerWidth={drawerWidth}
                          handleDrawerToggle={handleDrawerToggle}
                          mobileOpen={mobileOpen}
            />
            <div className={classes.content}>
                <div className={classes.toolbar} />
                {props.children}
            </div>
        </div>
    );
}
export default AdminNavBar
