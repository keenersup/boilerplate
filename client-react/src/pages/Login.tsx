import React, {useContext} from 'react';
import {AuthContext} from "../context/authContext";
import gql from 'graphql-tag'
import {useMutation} from "@apollo/react-hooks";
import {useForm} from 'react-hook-form'
import {useBreakpoints} from "../hooks/useBreakpoints";
import {RouteComponentProps} from 'react-router-dom'
import {
    Breadcrumbs,
    Button,
    Checkbox,
    Container,
    createStyles,
    FormControlLabel,
    Link,
    makeStyles,
    TextField,
    Theme,
    Typography,
} from "@material-ui/core";
import AdapterLink from '../components/AdapterLink';
import {TITLE} from "../config";
import {Roles} from '../types/enum';

interface IForm {
    email: string
    password: string
}

const useStyles = makeStyles((theme: Theme) => (
    createStyles({
            root: {
                marginTop: theme.spacing(25),
                '@media (max-height: 45rem)': {
                    marginTop: theme.spacing(15),
                },
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                minWidth: theme.spacing(30)
            },
            form: {
                width: '100%', // Fix IE 11 issue.
                marginTop: theme.spacing(1),
            },
            submitButton: {
                margin: theme.spacing(3, 0, 2),
            },
            breadcrumbs: {
                justifyContent: 'center',
            },
        }
    )
));

const Login: React.FC<RouteComponentProps> = (props) => {
    const context = useContext(AuthContext)
    const {clientId} = context
    const {register, handleSubmit, setError, errors} = useForm<IForm>({reValidateMode: 'onBlur'})
    const [login, {loading}] = useMutation(LOGIN_MUTATION, {
        update: (proxy, result) => {
            context.login(result.data.login)
            if (result.data.login.roles === Roles.admin) {
                props.history.push('/admin')
            }else{
                props.history.push('/')
            }
        },
        onError: (e) => {
            setError(Object.entries(e.graphQLErrors[0].extensions?.exception.errors).map(([key, value]) => {
                return {
                    type: "Login error",
                    name: key,
                    message: value as string
                }
            }))
        }
    })
    const onSubmit = async (data: IForm) => {
        if (clientId) {
            await login({
                variables: {
                    ...data,
                    clientId
                }
            })
        }
    }
    const onChangeCheckBox = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target);
    }
    const variantProps = useBreakpoints("down", "xs")
    const classes = useStyles()
    return (
        <Container component="main" maxWidth="xs">
            <div className={classes.root}>
                <Typography component="h1" variant="h5">
                    <Link underline="none" color="inherit" to="/" component={AdapterLink}>
                        {TITLE}
                    </Link>
                </Typography>
                <form className={classes.form} onSubmit={handleSubmit(onSubmit)} noValidate>
                    <TextField
                        {...variantProps}
                        margin="normal"
                        fullWidth
                        required
                        id="email"
                        label="이메일"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        inputRef={register({
                            required: '필수 정보입니다.',
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                message: "이메일 주소를 다시 확인해주세요."
                            }
                        })}
                        error={!!errors.email}
                        helperText={errors.email ? errors.email.message : ''}
                    />
                    <TextField
                        {...variantProps}
                        margin="normal"
                        fullWidth
                        required
                        name="password"
                        label="비밀번호"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        inputRef={register({
                            required: "필수 정보입니다.",
                            pattern: {
                                value: /^[a-zA-Z0-9]{4,30}$/i,
                                message: "올바른 암호를 입력하세요"
                            }
                        })}
                        error={!!errors.password}
                        helperText={errors.password ? errors.password.message : ''}
                    />
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" onChange={onChangeCheckBox} />}
                        label={
                            <Typography variant="body2">
                                로그인 상태 유지(개발중)
                            </Typography>
                        }

                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        disabled={loading}
                        className={classes.submitButton}
                    >
                        로그인
                    </Button>

                    <Breadcrumbs separator="|" aria-label="breadcrumb" classes={{
                        ol: classes.breadcrumbs,

                    }}>
                        <Link to="/" component={AdapterLink} variant="body2">
                            아이디 찾기(개발중)
                        </Link>
                        <Link to="/" component={AdapterLink} variant="body2">
                            비밀번호 찾기(개발중)
                        </Link>
                        <Link to="/register" component={AdapterLink} variant="body2">
                            회원가입
                        </Link>
                    </Breadcrumbs>
                </form>
            </div>
        </Container>
    );
}

const LOGIN_MUTATION = gql`
    mutation login(
        $email:String!
        $password: String!
        $clientId: String!
    ){
        login(
            email:$email
            password: $password
            clientId: $clientId
        ){
            id
            email
            username
            roles
            accessToken
        }

    }
`
export default Login;
