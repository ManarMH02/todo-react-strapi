import { SubmitHandler, useForm } from "react-hook-form"
import Button from "../components/ui/Button"
import { yupResolver } from "@hookform/resolvers/yup"
import axiosInstance from "../config/axios.config"
import toast from "react-hot-toast"
import { AxiosError } from "axios"
import { IErrorResponse } from "../interfaces"
import { logInSchema } from "../validation"
import { useState } from "react"
import { logInFormData } from "../data"
import Input from "../components/ui/Input"
import InputErrorMsg from "../components/ui/InputErrorMsg"
import {Link} from "react-router-dom"


function LoginPage() {
    interface IFormInput {
        identifier: string,
        password: string
    }
    const [isLoading, setIsLoading] = useState(false)

    ////////Handlers////////
    const { register, handleSubmit, formState: { errors } } = useForm<IFormInput>({ resolver: yupResolver(logInSchema) })
    const onSubmit: SubmitHandler<IFormInput> = async (data) => {
        setIsLoading(true)
        try {
            const {status, data: responseData} = await axiosInstance.post('/auth/local', data)
            if (status === 200) {
                toast.success('Login succeeded!', { className: 'toast', duration: 1800 });
                localStorage.setItem('loggedInUser', JSON.stringify(responseData))
                setTimeout(() => location.replace('/'), 2000)
            }
        } catch (error) {
            const errorObj = error as AxiosError<IErrorResponse>
            toast.error(`${errorObj.response?.data?.error.message}`, { className: 'toast' });
        } finally {
            setIsLoading(false)
        }
    }

    ////////Renders////////
    const renderLogInForm = logInFormData.map(({ placeholder, validation, name, type }, index) => (
        <div key={index}>
            <Input
                type={type}
                placeholder={placeholder}
                {...register(name, validation)}
            />
            {errors[name] && <InputErrorMsg msg={errors[name]?.message} />}
        </div>
    ))


    return (
        <div className="md:w-1/3">
            <h2 className="text-indigo-600 text-xl font-bold text-center">Login To Access!</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="flex-col flex gap-4 my-5">
                {renderLogInForm}
                <Button fullWidth isLoading={isLoading}>
                    {isLoading ? 'Loading...' : 'Login'}
                </Button>
                <p className="text-gray-400 text-sm font-semibold text-center">
                    Not a user?
                    <Link to='/register' className="text-indigo-600"> Register</Link>
                </p>
            </form>
        </div>
    )
}

export default LoginPage