import style from './forms-controls.module.css'

const FormControl = ({ meta, children }) => {

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

export const Textarea = (props) => {
    const { input, meta, child, ...restProps } = props
    return <FormControl {...props}> <textarea {...input} {...restProps} /> </FormControl>
}

export const Input = (props) => {
    const { input, meta, child, ...restProps } = props
    return <FormControl {...props}> <input {...input} {...restProps} /> </FormControl>
}