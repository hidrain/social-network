import { reduxForm, Field } from 'redux-form'
import { required } from '../../utils/validators/validators'
import { Input } from '../common/forms-controls/forms-controls'
import { connect } from 'react-redux'
import { login } from '../../redux/auth-reducer'
import { Navigate } from 'react-router-dom'
import style from '../common/forms-controls/forms-controls.module.css'



export const LoginForm = ({ handleSubmit, error }) => {

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
            {error && <div className={style.form_summary_error}>
                {error}
            </div>}
            <div>
                <button>Login</button>
            </div>
        </form>
    )
}

export const LoginReduxForm = reduxForm({ form: 'login' })(LoginForm)

export const Login = (props) => {

    const onSubmit = (formData) => {
        props.login(formData.email, formData.password, formData.rememberMe)
    }

    if (props.isAuth) {
        return <Navigate replace to='/profile' />
    }

    return (
        <div>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onSubmit} />
        </div>
    )
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth
})

export const LoginContainer = connect(mapStateToProps, { login })(Login)