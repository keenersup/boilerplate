import React, {useState} from 'react';
import {
    Button,
    useMediaQuery,
    useTheme,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions, FormControl, FormLabel, RadioGroup,
    FormControlLabel,
} from "@material-ui/core";
import gql from "graphql-tag";
import {useMutation} from '@apollo/react-hooks';
import {IUsers, USERS_QUERY} from "../../graphql/usersQuery";
import {Roles} from '../../types/enum';
import ErrorModal from "../error/ErrorModal";
import StyledRadio from './StyledRadio';


export type IEmpowerAdminButtonProps = {
    selectedUserId: string
    roles: Roles
}
const EmpowerAdminButton: React.FC<IEmpowerAdminButtonProps> = ({selectedUserId, roles, children}) => {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const [roleState, setRoleState] = useState<Roles>(roles)
    const [rolesOpen, setRolesOpen] = useState(false);

    const [empowerAdmin, {error}] = useMutation(EMPOWER_ADMIN_MUTATION, {
        variables: {
            id: selectedUserId,
            roles: roleState,
        },
        update: (cache) => {
            const existData: { users: IUsers[] } | null = cache.readQuery({query: USERS_QUERY})
            const modifiedUser = existData?.users.map(user => user.id === selectedUserId
                ? {...user, roles: roleState}
                : user)

            cache.writeQuery({query: USERS_QUERY, data: {users: modifiedUser}})
        },
    })


    const toggleRolesDialog = () => {
        setRoleState(roles)
        setRolesOpen(!rolesOpen)
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRoleState(parseInt(e.target.value))
    }

    return (
        <>
            <Button onClick={toggleRolesDialog}
                    color={roles === Roles.admin
                        ? "primary"
                        : "secondary"
                    }
            >
                {children}
            </Button>
            <Dialog
                fullScreen={fullScreen}
                open={rolesOpen}
                onClose={toggleRolesDialog}
            >
                <DialogTitle>권한</DialogTitle>
                <DialogContent>
                    <FormControl component="fieldset">
                        <FormLabel component="legend">권한</FormLabel>
                        <RadioGroup value={roleState} onChange={handleChange}>
                            <FormControlLabel value={Roles.admin} label="관리자" control={<StyledRadio />} />
                            <FormControlLabel value={Roles.user} label="일반유저" control={<StyledRadio />} />
                        </RadioGroup>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={toggleRolesDialog} color="primary">
                        취소
                    </Button>
                    <Button onClick={async () => {
                        if (roles !== roleState) {
                            await empowerAdmin()
                        }
                        toggleRolesDialog()
                    }} color="primary" autoFocus>
                        저장
                    </Button>
                </DialogActions>
            </Dialog>
            <ErrorModal error={error} />
        </>
    );
}
const EMPOWER_ADMIN_MUTATION = gql`
    mutation empowerAdmin($id:ID! $roles:Int!){
        empowerAdmin(id:$id roles:$roles)
    }
`
export default EmpowerAdminButton;