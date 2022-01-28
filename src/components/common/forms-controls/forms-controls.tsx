import { Field, WrappedFieldMetaProps, WrappedFieldProps } from 'redux-form'
import { FieldValidatorType } from '../../../utils/validators/validators'
import style from './forms-controls.module.css'

type FormControlPropsType = {
    meta: WrappedFieldMetaProps
}

const FormControl: React.FC<FormControlPropsType> = ({ meta, children }) => {

    const hasError = meta.touched && meta.error
    return (
        <div>
            <div className={(hasError ? style.error : '')}>
                {children}
            </div>
            {hasError && <span className={style.error}> {meta.error} </span>}
        </div>
    )
}

export const Textarea: React.FC<WrappedFieldProps> = (props) => {
    // const { input, meta, child, ...restProps } = props
    const { input, meta, ...restProps } = props
    return <FormControl {...props}> <textarea {...input} {...restProps} /> </FormControl>
}

export const Input: React.FC<WrappedFieldProps> = (props) => {
    // const { input, meta, child, ...restProps } = props
    const { input, meta, ...restProps } = props
    return <FormControl {...props}> <input {...input} {...restProps} /> </FormControl>
}

export type LoginFormValuesType = {
    email: string
    password: string
    rememberMe: boolean
    captcha: string
}

// type LoginFormValuesTypeKeys = keyof LoginFormValuesType

export function createField<FormKeysType extends string>(placeholder: string | undefined,
    name: FormKeysType,
    validators: Array<FieldValidatorType>,
    component: React.FC<WrappedFieldProps>,
    props = {}, text = "") {
    return <div>
        <Field placeholder={placeholder}
            name={name}
            validate={validators}
            component={component}
            {...props}
        /> {text}
    </div>
}

export type GetStringKeys<T> = Extract<keyof T, string>
