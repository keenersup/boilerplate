import React from 'react';
import {Hidden, Drawer, Divider, List, ListItem, ListItemIcon, ListItemText, useMediaQuery} from "@material-ui/core";
import {createStyles, makeStyles, Theme, useTheme} from "@material-ui/core/styles";
import AdapterLink from "../AdapterLink";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";

const useStyles = makeStyles((theme: Theme) => (
        createStyles({
            root: {},
            drawer: (props: any) => ({
                [theme.breakpoints.up('sm')]: {
                    width: props.drawerWidth,
                    flexShrink: 0,
                },
            }),
            drawerPaper: (props: any) => ({
                width: props.drawerWidth,
            }),
            toolbar: theme.mixins.toolbar,
        })
    )
)

export type IAdminSideBarProps = {
    drawerWidth: number
    mobileOpen: boolean
    handleDrawerToggle: () => void
}
const AdminSideBar = ({drawerWidth, mobileOpen, handleDrawerToggle}: IAdminSideBarProps) => {
    const classes = useStyles({drawerWidth: drawerWidth})
    const theme = useTheme();
    const xlSize = useMediaQuery(theme.breakpoints.up('lg'))
    const toggleOnXlSize = {
        onClick: () => {
            !xlSize && handleDrawerToggle()
        }
    }
    const drawer = (
        <div
            {...toggleOnXlSize}
        >
            <div className={classes.toolbar} />
            <Divider />
            <List>
                <ListItem button to="/admin" component={AdapterLink}>
                    <ListItemIcon>
                        <SupervisorAccountIcon />
                    </ListItemIcon>
                    <ListItemText primary="관리자" />
                </ListItem>
                <ListItem button to="/admin/admin_test" component={AdapterLink}>
                    <ListItemIcon>
                        <SupervisorAccountIcon />
                    </ListItemIcon>
                    <ListItemText primary="관리자테스트" />
                </ListItem>
                <ListItem button to="/admin/membership_management" component={AdapterLink}>
                    <ListItemIcon>
                        <SupervisorAccountIcon />
                    </ListItemIcon>
                    <ListItemText primary="회원관리" />
                </ListItem>
            </List>
            <Divider />
            <List>
                <ListItem button to="/" component={AdapterLink}>
                    <ListItemIcon>
                        <SupervisorAccountIcon />
                    </ListItemIcon>
                    <ListItemText primary="홈으로" />
                </ListItem>
            </List>
        </div>
    );

    return (
        <nav className={classes.drawer}>
            {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
            <Hidden mdUp implementation="css">
                <Drawer
                    variant="temporary"
                    anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                >
                    {drawer}
                </Drawer>
            </Hidden>
            <Hidden mdDown implementation="css">
                <Drawer
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                    variant="permanent"
                    open
                >
                    {drawer}
                </Drawer>
            </Hidden>
        </nav>
    );
}

export default AdminSideBar;