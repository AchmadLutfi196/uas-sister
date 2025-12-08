import api from './api'
import type {
    ApiResponse,
    UserWithStudent,
    UserWithTeacher,
    User,
    RegisterStudentData,
    RegisterTeacherData
} from '../types'

export const authService = {
    // Student auth - can login with NIM or Email
    async loginStudent(identifier: string, password: string): Promise<ApiResponse<UserWithStudent>> {
        const response = await api.post('/student/login', { identifier, password })
        return response.data
    },

    async registerStudent(data: RegisterStudentData): Promise<ApiResponse<UserWithStudent>> {
        const response = await api.post('/student/register', data)
        return response.data
    },

    async logoutStudent(): Promise<ApiResponse<UserWithStudent>> {
        const response = await api.patch('/student/logout')
        return response.data
    },

    async getStudentDetail(): Promise<ApiResponse<UserWithStudent>> {
        const response = await api.get('/student/detail')
        return response.data
    },

    // Teacher auth
    async loginTeacher(nip: string, password: string): Promise<ApiResponse<UserWithTeacher>> {
        const response = await api.post('/teacher/login', { nip, password })
        return response.data
    },

    async registerTeacher(data: RegisterTeacherData): Promise<ApiResponse<UserWithTeacher>> {
        const response = await api.post('/teacher/register', data)
        return response.data
    },

    async logoutTeacher(): Promise<ApiResponse<UserWithTeacher>> {
        const response = await api.patch('/teacher/logout')
        return response.data
    },

    async getTeacherDetail(): Promise<ApiResponse<UserWithTeacher>> {
        const response = await api.get('/teacher/detail')
        return response.data
    },

    // Admin auth
    async loginAdmin(email: string, password: string): Promise<ApiResponse<User>> {
        const response = await api.post('/admin/login', { email, password })
        return response.data
    },

    async logoutAdmin(): Promise<ApiResponse<User>> {
        const response = await api.patch('/admin/logout')
        return response.data
    },

    async getAdminDetail(): Promise<ApiResponse<User>> {
        const response = await api.get('/admin')
        return response.data
    },
}

export default authService
