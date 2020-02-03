import React from 'react';
import {createStyles, makeStyles, Theme} from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => (
        createStyles({
            root: {
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent:'center',
                // height:'100%'
            },
        })
    )
)

export type IAdminTestProps = {}
const AdminTest = (props: IAdminTestProps) => {
    const classes = useStyles()
    return (
        <div className={classes.root}>
            관리자 테스트 페이지입니다.
        </div>
    );
}

export default AdminTest;