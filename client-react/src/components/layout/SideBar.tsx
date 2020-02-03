import React, {useContext} from 'react';
import {Divider, Drawer, List, ListItem, ListItemIcon, ListItemText} from '@material-ui/core';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import makeStyles from "@material-ui/core/styles/makeStyles";

import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import AdapterLink from "../AdapterLink";
import {AuthContext} from "../../context/authContext";
import {Roles} from "../../types/enum";

interface Props {
    state: boolean,
    setState: (value: (((prevState: boolean) => boolean) | boolean)) => void,
}

const useStyles = makeStyles({
    list: {
        width: 250,
    },
});

const SideBar: React.FC<Props> = ({state, setState}) => {
    const classes = useStyles()
    const context = useContext(AuthContext)
    const toggleDrawer = (e: React.MouseEvent) => {
        setState(!state)
    }

    const sideList = (
        <div
            className={classes.list}
            onClick={toggleDrawer}
        >
            <List>
                {['All mail', 'Trash', 'Spam'].map((text, index) => (
                    <ListItem button key={text}>
                        <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
            </List>
            {
                context.user?.roles === Roles.admin &&
                <>
                  <Divider />
                  <List>
                    <ListItem button to="/admin" component={AdapterLink}>
                      <ListItemIcon>
                        <SupervisorAccountIcon />
                      </ListItemIcon>
                      <ListItemText primary="Admin" />
                    </ListItem>
                  </List>
                </>
            }
        </div>
    );


    return (
        <Drawer open={state} onClose={toggleDrawer}>
            {sideList}
        </Drawer>);
}

export default SideBar;