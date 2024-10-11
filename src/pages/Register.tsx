import Button from "../components/ui/Button"
import Input from "../components/ui/Input"
import { useForm, SubmitHandler } from "react-hook-form"
import InputErrorMsg from "../components/ui/InputErrorMsg"
import { registerFormData } from "../data"
import { yupResolver } from "@hookform/resolvers/yup"
import { registerSchema } from "../validation"
import axiosInstance from "../config/axios.config"
import toast from "react-hot-toast"
import { useState } from "react"
import { AxiosError } from "axios"
import { IErrorResponse } from "../interfaces"
import { Link, useNavigate } from "react-router-dom"

function RegisterPage() {

    interface IFormInput {
        username: string,
        email: string,
        password: string
    }
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()

    ////////Handlers////////
    const { register, handleSubmit, formState: { errors } } = useForm<IFormInput>({ resolver: yupResolver(registerSchema) })
    const onSubmit: SubmitHandler<IFormInput> = async (data) => {
        setIsLoading(true)
        try {
            const response = await axiosInstance.post('/auth/local/register', data)
            if (response.status === 200) {
                toast.success('Register succeeded!', {className: 'toast', duration:1500});
                setTimeout(() => navigate('/login') , 2000)
            }
            console.log(response);
        } catch (error) {
            const errorObj = error as AxiosError<IErrorResponse>
            toast.error(`${errorObj.response?.data?.error.message}`,{className: 'toast'});
        } finally {
            setIsLoading(false)
        }
    }

    ////////Renders////////
    const renderRegisterForm = registerFormData.map(({ placeholder, validation, name, type }, index) => (
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
            <h2 className="text-indigo-600 text-xl font-bold text-center">Register To Access!</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="flex-col flex gap-4 my-5">
                {renderRegisterForm}
                <Button fullWidth isLoading={isLoading}>
                    {isLoading? 'Loading' : 'Register'}
                </Button>
                <p className="text-gray-400 text-sm font-semibold text-center">
                    Already a user?
                    <Link to='/login' className="text-indigo-600"> Login</Link>
                </p>
            </form>
        </div>
    )
}

export default RegisterPage