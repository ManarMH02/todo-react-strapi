import { useQuery } from "@tanstack/react-query"
import axiosInstance from "../config/axios.config"
import { AxiosRequestConfig } from "axios"


interface IAuthQuery { 
    queryKey: string[],
    url: string,
    config?: AxiosRequestConfig
}

function useAuthQuery({queryKey, url, config}: IAuthQuery) {
    return useQuery({
        queryKey,
        queryFn: async () => {
            const { data } = await axiosInstance(url, config)
            return data
        }
    })
}

export default useAuthQuery