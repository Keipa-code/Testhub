import axios, {AxiosRequestConfig} from 'axios'
import { AxiosResponse, AxiosError } from 'axios'
import { storage } from './tools'
import { JWT_TOKEN } from '../constants'
import helper from './httpHelper'

const $http = axios.create({
    baseURL: '/api',
    responseType: 'json',
    timeout: 60000 * 2
})

$http.interceptors.request.use((config: AxiosRequestConfig) => {
    if (storage.get(JWT_TOKEN)) {
        config.headers['Authorization'] = 'Bearer ' + storage.get(JWT_TOKEN)
    }
    return config
}, error => {
    return Promise.reject(error)
})

$http.interceptors.response.use(response => {
    //helper.successHelper(response)
    // console.log(response)
    return Promise.resolve(response) // status:200, normal
}, error => {
    return Promise.reject(error.response)
})

export default $http