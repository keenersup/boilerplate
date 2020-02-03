import React, { useContext} from 'react';
import {AuthContext} from "../context/authContext";
import {useForm} from 'react-hook-form';
import {
    Button,
    Container,
    createStyles,
    Grid,
    makeStyles,
    TextField,
    Theme,
    Typography,
    Link,
    Checkbox,
    FormControlLabel,
} from "@material-ui/core";
import {useMutation} from "@apollo/react-hooks";
import gql from 'graphql-tag'
import {RouteComponentProps} from 'react-router-dom';
import AdapterLink from "../components/AdapterLink";
import {useBreakpoints} from "../hooks/useBreakpoints";
import {TITLE} from "../config";


interface IForm {
    username: string
    email: string
    password: string
    confirmPassword: string
}

const useStyles = makeStyles((theme: Theme) => (
    createStyles({
        root: {
            marginTop: theme.spacing(20),
            '@media (max-height: 50rem)': {
                marginTop: theme.spacing(10),
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
    })
))

const Register: React.FC<RouteComponentProps> = (props) => {
    const classes = useStyles()
    const context = useContext(AuthContext)
    const {clientId} = context
    const {register, handleSubmit, watch, setError, errors} = useForm<IForm>({reValidateMode: 'onBlur'})
    const [registerMutation, {loading}] = useMutation(REGISTER_MUTATION, {
        update: (proxy, result) => {
            context.login(result.data.register)
            props.history.push('/',)
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

    const password = React.useRef({});
    password.current = watch("password", "");

    const onSubmit = async (data: IForm) => {
        await registerMutation({
            variables: {
                ...data,
                clientId
            }
        })
    }
    const onChangeCheckBox = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target);
    }

    const variantProps = useBreakpoints("down","xs" )

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
                        id="username"
                        label="아이디"
                        name="username"
                        autoComplete="name"
                        autoFocus
                        inputRef={register({
                            required: '필수 정보입니다.',
                            // pattern: {
                            //     value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                            //     message: "이메일 주소를 다시 확인해주세요."
                            // }
                        })}
                        error={!!errors.username}
                        helperText={errors.username ? errors.username.message : ''}
                    />
                    <TextField
                        {...variantProps}
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="이메일"
                        name="email"
                        autoComplete="email"
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
                        autoComplete="new-password"
                        inputRef={register({
                            required: "필수 정보입니다.",
                            pattern: {
                                value: /^[a-zA-Z0-9]{4,30}$/i,
                                message: "올바른 암호를 입력하세요."
                            }
                        })}
                        error={!!errors.password}
                        helperText={errors.password ? errors.password.message : ''}
                    />
                    <TextField
                        {...variantProps}
                        margin="normal"
                        fullWidth
                        required
                        name="confirmPassword"
                        label="비밀번호 재확인"
                        type="password"
                        id="confirmPassword"
                        inputRef={register({
                            required: "필수 정보입니다.",
                            pattern: {
                                value: /^[a-zA-Z0-9]{4,30}$/i,
                                message: "올바른 암호를 입력하세요."
                            },
                            validate: value =>
                                value === password.current || "비밀번호가 일치하지 않습니다."
                        })}
                        error={!!errors.confirmPassword}
                        helperText={errors.confirmPassword ? errors.confirmPassword.message : ''}
                    />
                    <FormControlLabel
                        control={<Checkbox value="permit" color="primary" onChange={onChangeCheckBox} />}
                        label={
                            <Typography variant="body2">
                                동의합니다.(개발중)
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
                        가입하기
                    </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link component={AdapterLink} to="/login" variant="body2">
                                로그인
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
}
const REGISTER_MUTATION = gql`
    mutation register(
        $username: String!
        $email: String!
        $password: String!
        $confirmPassword: String!
        $clientId: String!
    ){
        register(
            username: $username
            email: $email
            password: $password
            confirmPassword: $confirmPassword
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
export default Register;