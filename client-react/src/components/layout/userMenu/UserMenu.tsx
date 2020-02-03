import React, {useContext, useState} from 'react';
import {Badge, Divider, IconButton, Menu, MenuItem, useMediaQuery, useTheme} from "@material-ui/core";
import NotificationsIcon from "@material-ui/icons/Notifications";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MoreIcon from "@material-ui/icons/MoreVert";
import {AuthContext} from "../../../context/authContext";

export type IUserMenuProps = {
}
const UserMenu = (props: IUserMenuProps) => {
    const context = useContext(AuthContext)
    const theme = useTheme()
    const matches = useMediaQuery(theme.breakpoints.up('md'))


    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const isMenuOpen = Boolean(anchorEl);

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };


    React.useEffect(() => {
        handleMenuClose()
    }, [matches])

    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleMenuClose}>
                <IconButton color="inherit">
                    <Badge badgeContent={19} color="secondary">
                        <NotificationsIcon />
                    </Badge>
                </IconButton>
                <p>Notifications</p>
            </MenuItem>
            <Divider />
            <MenuItem onClick={() => {
                handleMenuClose()
                context.logout()
            }}>
                <IconButton color="inherit">
                    <ExitToAppIcon />
                </IconButton>
                로그아웃
            </MenuItem>
        </Menu>
    );

    const renderMobileMenu = (
        <Menu
            anchorEl={anchorEl}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleMenuClose}>
                <IconButton color="inherit">
                    <Badge badgeContent={19} color="secondary">
                        <NotificationsIcon />
                    </Badge>
                </IconButton>
                <p>Notifications</p>
            </MenuItem>
            <Divider />
            <MenuItem onClick={() => {
                handleMenuClose()
                context.logout()
            }}>
                <IconButton color="inherit">
                    <ExitToAppIcon />
                </IconButton>
                <p>로그아웃</p>
            </MenuItem>
        </Menu>
    );

    return (
        matches
            ? <>
                <IconButton
                    onClick={handleMenuOpen}
                    color="inherit"
                >
                    <AccountCircle />
                </IconButton>
                {renderMenu}
            </>
            : <>

                <IconButton
                    onClick={handleMenuOpen}
                    color="inherit"
                >
                    <MoreIcon />
                </IconButton>
                {renderMobileMenu}
            </>

    );
}

export default UserMenu;