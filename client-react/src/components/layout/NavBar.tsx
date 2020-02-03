import React, {useContext, useState} from 'react';
import {AuthContext} from "../../context/authContext";
import {
    AppBar,
    Button,
    IconButton,
    InputBase,
    Link,
    Toolbar,
    Typography
} from '@material-ui/core';
import {createStyles, fade, makeStyles, Theme} from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AdapterLink from "../AdapterLink";
import {TITLE} from "../../config";
import SideBar from './SideBar';
import UserMenu from "./userMenu/UserMenu";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        grow: {
            flexGrow: 1,
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        title: {
            display: 'none',
            [theme.breakpoints.up('sm')]: {
                display: 'block',
            },
        },
        search: {
            position: 'relative',
            borderRadius: theme.shape.borderRadius,
            backgroundColor: fade(theme.palette.common.white, 0.15),
            '&:hover': {
                backgroundColor: fade(theme.palette.common.white, 0.25),
            },
            marginRight: theme.spacing(2),
            marginLeft: 0,
            width: '100%',
            [theme.breakpoints.up('sm')]: {
                marginLeft: theme.spacing(3),
                width: 'auto',
            },
        },
        searchIcon: {
            width: theme.spacing(7),
            height: '100%',
            position: 'absolute',
            pointerEvents: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        inputRoot: {
            color: 'inherit',
        },
        inputInput: {
            padding: theme.spacing(1, 1, 1, 7),
            transition: theme.transitions.create('width'),
            width: '100%',
            [theme.breakpoints.up('md')]: {
                width: 200,
            },
        },
    }),
);

const NavBar = () => {
    const context = useContext(AuthContext)
    const [sideBarState, setSideBar] = useState(false)
    const classes = useStyles();

    return (
        <div className={classes.grow}>
            <AppBar position="static">
                <Toolbar>
                    <SideBar state={sideBarState} setState={setSideBar} />
                    <IconButton
                        edge="start"
                        className={classes.menuButton}
                        color="inherit"
                        onClick={() => setSideBar(!sideBarState)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography className={classes.title} variant="h6" noWrap>
                        <Link color="inherit" underline="none" to="/" component={AdapterLink}>
                            {TITLE}
                        </Link>
                    </Typography>
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon />
                        </div>
                        <InputBase
                            placeholder="Search…(개발중)"
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                        />
                    </div>
                    <div className={classes.grow} />
                    {context.user
                        ? <UserMenu />
                        : <>
                            <Button color="inherit" to="/register" component={AdapterLink}>회원가입</Button>
                            <Button color="inherit" to="/login" component={AdapterLink}>로그인</Button>
                        </>

                    }
                </Toolbar>
            </AppBar>
        </div>
    );
}
export default NavBar