import classes from './../dialogs.module.css'

type PropsType = {
    message: string
}

export const Message: React.FC<PropsType> = ({ message }) => {
    return (
        <div className={classes.message}>{message}</div>
    );
}


