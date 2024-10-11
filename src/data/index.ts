import { ILogInInput, IRegisterInput } from "../interfaces";

export const registerFormData: IRegisterInput[] = [
    {
        name: 'username',
        placeholder: 'Username',
        type: 'text',
        validation: {
            required: true,
            minLength: 5
        }
    },
    {
        name: 'email',
        placeholder: 'Email',
        type: 'text',
        validation: {
            required: true,
            pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        }
    },
    {
        name: 'password',
        placeholder: 'Password',
        type: 'password',
        validation: {
            required: true,
            minLength: 6
        }
    }
]

export const logInFormData: ILogInInput[] = [
    {
        name: 'identifier',
        placeholder: 'Email',
        type: 'text',
        validation: {
            required: true,
            pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        }
    },
    {
        name: 'password',
        placeholder: 'Password',
        type: 'password',
        validation: {
            required: true,
            minLength: 6
        }
    }
]