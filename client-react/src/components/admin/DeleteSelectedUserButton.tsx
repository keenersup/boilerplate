import React, {useContext} from 'react';
import {Button} from "@material-ui/core";
import gql from "graphql-tag";
import {useMutation} from '@apollo/react-hooks';
import {USERS_QUERY, IUsers} from '../../graphql/usersQuery';
import {AuthContext} from "../../context/authContext";
import ErrorModal from "../error/ErrorModal";

export type IDeleteButtonProps = {
    selectedUserId: string
}
const DeleteSelectedUserButton: React.FC<IDeleteButtonProps> = ({selectedUserId, children}) => {
    const context = useContext(AuthContext)
    const [deleteSelectedUser, {error}] = useMutation(DELETE_SELECTED_USER_MUTATION, {
        variables: {
            id: selectedUserId
        },
        update: (cache) => {
            const existData: { users: IUsers[] } | null = cache.readQuery({
                query: USERS_QUERY
            })
            const newData = existData?.users.filter(user => user.id !== selectedUserId)
            cache.writeQuery({query: USERS_QUERY, data: {users: newData}})
            if (selectedUserId === context?.user?.id) {
                context.logout()
            }
        },
    })
    return (
        <>
            <Button onClick={() => deleteSelectedUser()}
                    variant="contained"
                    color="secondary"
            >
                {children}
            </Button>
            <ErrorModal error={error} />
        </>
    );
}

const DELETE_SELECTED_USER_MUTATION = gql`
    mutation deleteSelectedUser($id:ID!){
        deleteSelectedUser(id:$id)
    }
`
export default DeleteSelectedUserButton;