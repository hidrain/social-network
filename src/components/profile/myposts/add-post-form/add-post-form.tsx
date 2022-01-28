import { Field, InjectedFormProps, reduxForm } from "redux-form";
import { maxLengthCreator, required } from '../../../../utils/validators/validators'
import { Textarea } from "../../../common/forms-controls/forms-controls";

type PropsType = {}
export type AddPostFormValuesType = {
    newPostText: string
}

const maxLength50 = maxLengthCreator(50)

const AddPostForm: React.FC<InjectedFormProps<AddPostFormValuesType, PropsType> & PropsType> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field component={Textarea} name={'newPostText'} placeholder={'Write a new post'}
                    validate={[required, maxLength50]} />
            </div>
            <div>
                <button>Add post</button>
            </div>
        </form>
    )
}

export default reduxForm<AddPostFormValuesType, PropsType>({ form: 'profile-add-post' })(AddPostForm)
