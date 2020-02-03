import React from 'react';
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles"
import AllUserTable from "../components/admin/AllUserTable";

const useStyles = makeStyles((theme: Theme) => (
        createStyles({
            root: {
                // paddingTop: theme.spacing(4),
                // paddingBottom: theme.spacing(4),
                padding: theme.spacing(4)
            },
        })
    )
)

export interface IMembershipTableProps {
}

const MembershipTable: React.FC<IMembershipTableProps> = (props) => {
    const classes = useStyles()
    return (
        <div className={classes.root}>
            <AllUserTable rowsPerPage={10} />
        </div>
    );
}

export default MembershipTable;