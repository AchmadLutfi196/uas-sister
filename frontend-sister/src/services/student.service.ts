import api from './api'
import type { ApiResponse, UserWithStudent } from '../types'

export const studentService = {
    async getAll(): Promise<ApiResponse<UserWithStudent[]>> {
        const response = await api.get('/student')
        return response.data
    },

    async update(data: { name?: string; email?: string; password?: string; telephone?: string }): Promise<ApiResponse<UserWithStudent>> {
        const response = await api.patch('/student', data)
        return response.data
    },

    async delete(id: number): Promise<ApiResponse<UserWithStudent>> {
        const response = await api.delete(`/student/${id}`)
        return response.data
    },
}

export default studentService
