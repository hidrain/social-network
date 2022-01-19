import classes from './../dialogs.module.css'

export const Message = ({ message }) => {
    return (
        <div className={classes.message}>{message}</div>
    );
}


