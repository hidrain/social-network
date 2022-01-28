import { reduxForm, Field, InjectedFormProps } from 'redux-form'
import { required } from '../../utils/validators/validators'
import { Input } from '../common/forms-controls/forms-controls'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../../redux/auth-reducer'
import { Navigate } from 'react-router-dom'
import style from '../common/forms-controls/forms-controls.module.css'
import { AppStateType } from '../../redux/redux-store'

type LoginFormOwnProps = {
    captchaUrl: string | null
}
export type LoginFormValuesType = {
    email: string
    password: string
    rememberMe: boolean
    captcha: string
}


export const LoginForm: React.FC<InjectedFormProps<LoginFormValuesType, LoginFormOwnProps> & LoginFormOwnProps> = (
    { handleSubmit, error, captchaUrl }) => {

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <Field placeholder={'email'} name={'email'} component={Input}
                    validate={[required]} />
            </div>
            <div>
                <Field placeholder={'password'} name={'password'} component={Input}
                    validate={[required]} type={'password'} />
            </div>
            <div>
                <Field type={'checkbox'} name={'rememberMe'} component={Input} /> remember me
            </div>

            {captchaUrl && <img src={captchaUrl} alt='' />}
            {captchaUrl && <Field placeholder={'symbols from image'} name={'captcha'} component={Input}
                validate={[required]} />}

            {error && <div className={style.form_summary_error}>
                {error}
            </div>}
            <div>
                <button>Login</button>
            </div>
        </form>
    )
}

export const LoginReduxForm = reduxForm<LoginFormValuesType, LoginFormOwnProps>({ form: 'login' })(LoginForm)

// type LoginFormValuesTypeKeys = Extract<keyof LoginFormValuesType, string>

export const LoginPage: React.FC = () => {

    const captchaUrl = useSelector((state: AppStateType) => state.auth.captchaUrl)
    const isAuth = useSelector((state: AppStateType) => state.auth.isAuth)

    const dispatch = useDispatch()

    const onSubmit = (formData: LoginFormValuesType) => {
        dispatch(login(formData.email, formData.password, formData.rememberMe, formData.captcha))
    }

    if (isAuth) {
        return <Navigate replace to='/profile' />
    }

    return (
        <div>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onSubmit} captchaUrl={captchaUrl} />
        </div>
    )
}
