

export interface IRegisterInput {
    name: 'username' | 'email' | 'password',
    placeholder: string,
    type: 'text' | 'password',
    validation: {
        required?: true,
        minLength?: number,
        pattern?: RegExp
    }
}

export interface ILogInInput {
    name: 'identifier' | 'password',
    placeholder: string,
    type: 'text' | 'password',
    validation: {
        required?: true,
        minLength?: number,
        pattern?: RegExp
    }
}

export interface IErrorResponse {
    error: {
        message?: string
    }
}

export interface ITodo {
    id: number,
    title: string,
    description?: string
    documentId: string
}