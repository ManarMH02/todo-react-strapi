
import * as yup from "yup"

export const registerSchema = yup.object({
    username: yup.string().
        required('Username is required.').
        min(5, 'Username should has at least 5 characters!'),

    email: yup.string().
        matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Email address isn't valid.").
        required("Email address is required."),

    password: yup.string().
        required('Password is required.').
        min(6, 'Password should has at least 6 characters!')
}).required()


export const logInSchema = yup.object({
    identifier: yup.string().
        matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Email address isn't valid.").
        required("Email address is required."),

    password: yup.string().
        required('Password is required.').
        min(6, 'Password should has at least 6 characters!')
}).required()

export const TodoSchema = (title: string, description?: string) => {
    const errors: { title: string, description: string } = { title: '', description: '' }
    if (title.length === 0) errors.title = "title is required!"
    if (description?.length === 0) errors.description = "description is required!"
    return errors
}