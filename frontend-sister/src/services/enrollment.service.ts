import api from './api'
import type { ApiResponse, Enrollment } from '../types'

export const enrollmentService = {
    async getAll(): Promise<ApiResponse<Enrollment[]>> {
        const response = await api.get('/enrollment')
        return response.data
    },

    async getByScheduleId(scheduleId: number): Promise<ApiResponse<Enrollment>> {
        const response = await api.get(`/enrollment/${scheduleId}`)
        return response.data
    },

    async getByStudentId(studentId: number): Promise<ApiResponse<Enrollment[]>> {
        const response = await api.get(`/enrollment/student/${studentId}`)
        return response.data
    },

    async register(scheduleIds: number[]): Promise<ApiResponse<Enrollment[]>> {
        const response = await api.post('/enrollment/register', { scheduleId: scheduleIds })
        return response.data
    },

    async delete(scheduleIds: number[]): Promise<ApiResponse<{ message: string }>> {
        const response = await api.delete('/enrollment', { data: { scheduleId: scheduleIds } })
        return response.data
    },

    async validate(): Promise<ApiResponse<Enrollment[]>> {
        const response = await api.post('/enrollment/validation')
        return response.data
    },
}

export default enrollmentService
