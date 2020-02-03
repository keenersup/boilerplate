import React, {useState} from 'react';
import {
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    InputBase,
    TableFooter,
    TableContainer,
    Paper
} from "@material-ui/core";
import {createStyles, fade, Theme, makeStyles} from '@material-ui/core/styles'
import Title from './Title';
import {useQuery} from "@apollo/react-hooks";
import NotFoundPage from "../error/NotFoundPage";
import Fallback from "../Fallback";
import DeleteSelectedUserButton from "./DeleteSelectedUserButton";
import {USERS_QUERY, IUsers} from '../../graphql/usersQuery';
import {Roles} from '../../types/enum';
import EmpowerAdminButton from "./EmpowerAdminButton";
import SearchIcon from '@material-ui/icons/Search';
import TablePaginationActions from './TablePaginationActions';
import moment from 'moment'

const minWidth = 600
const useStyles = makeStyles((theme: Theme) => (
        createStyles({
            root: {},
            seeMore: {
                marginTop: theme.spacing(3),
            },
            paper: {
                width: '100%',
                padding: theme.spacing(2),
                paddingBottom: 0,
            },
            table: {
                minWidth: minWidth,
            },
            footerCell: {
                borderBottom: '0'
            },
            title: {
                display: 'flex',
                minWidth: minWidth,
                justifyContent: 'space-between',
                '&>h2': {
                    minWidth: '7rem',
                }
            },
            search: {
                position: 'relative',
                borderRadius: theme.shape.borderRadius,
                backgroundColor: fade(theme.palette.common.white, 0.15),
                '&:hover': {
                    backgroundColor: fade(theme.palette.common.white, 0.25),
                },
                marginLeft: 0,
                [theme.breakpoints.up('sm')]: {
                    marginLeft: theme.spacing(1),
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
                width: 120,
                '&:focus': {
                    width: 200,
                },
            },
        })
    )
)


export type IAllUserTableProps = {
    rowsPerPage: number
}
const AllUserTable = ({rowsPerPage}: IAllUserTableProps) => {
    const classes = useStyles()
    const [page, setPage] = useState(0);
    const {loading, error, data} = useQuery(USERS_QUERY, {fetchPolicy: "cache-and-network"})

    if (loading) {
        return <Fallback />
    }
    if (error) {
        return <NotFoundPage />
    }
    const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        setPage(newPage);
    };

    const userRolesConverse = (roles: number) => {
        if (roles === Roles.admin) {
            return '관리자'
        }
        if (roles === Roles.user) {
            return '일반유저'
        }
    }

    return (
        <TableContainer component={Paper} className={classes.paper}>
            <div className={classes.title}>
                <Title>회원관리</Title>
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
            </div>
            {data &&
            <Table size="small" className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell align="center">아이디</TableCell>
                  <TableCell align="center">이메일</TableCell>
                  <TableCell align="center">생성일</TableCell>
                  <TableCell align="center">권한설정</TableCell>
                  <TableCell align="center">삭제</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                  {(rowsPerPage > 0
                      ? data.users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      : data.users).map((user: IUsers, i: number) => {
                      return (
                          <TableRow key={i}>
                              <TableCell align="center">{user.username}</TableCell>
                              <TableCell align="center">{user.email}</TableCell>
                              <TableCell align="center">
                                  {moment(parseInt(user.createdAt, 10)).fromNow(true)}
                              </TableCell>
                              <TableCell align="center">
                                  <EmpowerAdminButton
                                      selectedUserId={user.id}
                                      roles={user.roles}
                                  >
                                      {userRolesConverse(user.roles)}
                                  </EmpowerAdminButton>
                              </TableCell>
                              <TableCell align="center">
                                  <DeleteSelectedUserButton
                                      selectedUserId={user.id}
                                  >삭제</DeleteSelectedUserButton>
                              </TableCell>
                          </TableRow>)
                  })}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={5} align="center"
                             classes={{footer: classes.footerCell}}
                             variant='footer'

                  >
                    <TablePaginationActions
                      count={data.users.length}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      onChangePage={handleChangePage}
                    />
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>
            }
        </TableContainer>
    );
}
export default AllUserTable;